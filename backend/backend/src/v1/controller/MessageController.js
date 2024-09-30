const { renameSync } = require('fs');
const User = require("../modal/User");
const Message = require("../modal/Message");
var formidable = require("formidable");
const imageUpload = require('../Utils/ImageUpload');
const responseHandlier = require('../Utils/response/status');

// exports.getMessages = async (nodeId) => {
//   try {
//     if (!nodeId) {
//       return res.status(400).json({ message: 'nodeId is required' });
//     }
//     const messages = await Message.find({ nodeId }).exec();
//     return messages;
//   } catch (err) {
//     return err
//   }
// };

exports.addMessage = async (req, res, next) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    return responseHandlier.successResponse(true, newMessage, res);
  } catch(err) {
    next(err);
  }
};

exports.getInitialContactsWithMessages = async (req, res, next) => {
  try {
    const userId = req.params.from;
    const user = await User.findById(userId).populate('sentMessages receivedMessages');
    const messages = [...user.sentMessages, ...user.receivedMessages].sort((a, b) => b.createdAt - a.createdAt);
    const users = new Map();
    const messageStatusChange = [];
    messages.forEach(msg => {
      const isSender = msg.senderId.toString() === userId;
      const calculatedId = isSender ? msg.receiverId : msg.senderId;

      if (msg.messageStatus === 'sent') {
        messageStatusChange.push(msg._id);
      }

      if (!users.get(calculatedId)) {
        const { _id, type, message, messageStatus, createdAt, senderId, receiverId } = msg;
        let user = {
          messageId: _id,
          type,
          message,
          messageStatus,
          createdAt,
          senderId,
          receiverId
        };
        if (isSender) {
          user = { ...user, ...msg.receiver.toObject(), totalUnreadMessages: 0 };
        } else {
          user = { ...user, ...msg.sender.toObject(), totalUnreadMessages: messageStatus !== 'read' ? 1 : 0 };
        }
        users.set(calculatedId, user);
      } else if (msg.messageStatus !== 'read' && !isSender) {
        const user = users.get(calculatedId);
        users.set(calculatedId, { ...user, totalUnreadMessages: user.totalUnreadMessages + 1 });
      }
    });

    if (messageStatusChange.length > 0) {
      await Message.updateMany(
        { _id: { $in: messageStatusChange } },
        { $set: { messageStatus: 'delivered' } }
      );
    }

    res.status(200).json({
      users: Array.from(users.values()),
      onlineUsers: Array.from(onlineUsers.keys())
    });
  } catch (err) {
    next(err);
  }
};

exports.addAudioMessage = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.multiples = false; // Only one file at a time
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    return res.status(400).send("Request must be a multipart form data");
  }

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        return res.status(400).send(err.message);
      }
      
      const { from, to } = fields.data;

      if (!from || !to) {
        return res.status(400).send("From and to are required.");
      }

      if (!files.file) {
        return res.status(400).send("Audio file is required.");
      }

      const fileName = await imageUpload(files.file);

      const message = new Message({
        message: fileName,
        senderId: from,
        receiverId: to,
        type: 'audio'
      });

      await message.save();
      return res.status(201).json({ message });
    } catch (err) {
      next(err);
    }
  });
};

exports.addImageMessage = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.multiples = false; // Only one file at a time
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    return res.status(400).send("Request must be a multipart form data");
  }

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        return res.status(400).send(err.message);
      }

      const { from, to } = fields.data;

      if (!from || !to) {
        return res.status(400).send("From and to are required.");
      }

      if (!files.file) {
        return res.status(400).send("Image file is required.");
      }

      const fileName = await imageUpload(files.file);

      const message = new Message({
        message: fileName,
        senderId: from,
        receiverId: to,
        type: 'image'
      });

      await message.save();
      return res.status(201).json({ message });
    } catch (err) {
      next(err);
    }
  });
};