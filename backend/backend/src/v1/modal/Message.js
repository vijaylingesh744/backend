const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  _id: { type: Number, required: true }, // _id field as a number (timestamp in this case)
  chatID: { type: String, required: true },
  text: { type: String, default: '' },
  image: { type: String, default: '' },
  video: { type: String, default: '' },
  audio: { type: String, default: '' },
  type: { type: Number, default: 0 }, // Changed to Number as per new requirements
  createdAt: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  user: {
    _id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    profile: { type: String, default: '' }
  },
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  nodeId: { type: String, required: true }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
