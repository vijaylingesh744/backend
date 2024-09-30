const Event = require("../modal/Event");
let Validator = require("validatorjs");
const ObjectId = require('mongoose').Types.ObjectId;

exports.AddEvent = async(req, res)=>{
    // try{
        const filter = {
            client_id: req.body.client_id,
            project_id: req.body.project_id,
            bp_id: req.body.bp_id,
            // date: req.body.date,
          };
          const update = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time,
            status: req.body.status,
            timezone: req.body.timezone,
            created_by: req.body.created_by,
            client_name: req.body.client_name,
            client_id: req.body.client_id,
            project_id: req.body.project_id,
            bp_id: req.body.bp_id,
          };
          const options = { new: true, upsert: true };
          const event = await Event.findOneAndUpdate(filter, update, options);
          return res.json({ message: 'Event processed successfully', status: true, data: event });
//   } catch(err){
//       return res.status(500).json({ message: 'Internal server error' });
//   }
  };
  
exports.ListUserEvent = async (req, res) => {   
  try{
    var type = req.query?.type;
      var items = await Event.find({client_id:ObjectId(req.params.id)});
      if(type ==1){
        items = await Event.find({bp_id:ObjectId(req.params.id)});
      }
      res.json({ message: 'Event Listed successfully',status:true,data:items });
  }catch(err){
      res.status(500).json({ message: 'Internal server error' });
  }
};
exports.ListEvent = async (req, res) => {   
  try{
      const items = await Event.find();
      res.json({ message: 'Event Listed successfully',status:true,data:items });
  }catch(err){
      res.status(500).json({ message: 'Internal server error' });
  }
};
  
  exports.DeleteEvent = async (req, res) => {
      try {
          const item = await Event.findById(req.params.itemId);
          if(!item) {
              return res.status(404).json({ message: 'Event not found' });
          }
          await Event.findByIdAndDelete(req.params.itemId);
          res.json({ message: 'Event deleted successfully',status:true });
      } catch (err) {
          res.status(500).json({ message: 'Internal server error' });
      }
  };
  
  exports.UpdateEvent = async (req, res) => {
      try {
          const item = await Event.findById(req.params.itemId);
          if (!item) {
              return res.status(404).json({ message: 'Event not found' });
          }
          await Event.findByIdAndUpdate(req.params.itemId, {
            client_id: req.body.client_id,
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time,
            project_id: req.body.project_id,
            status: req.body.status,
            timezone: req.body.timezone,
            created_by: req.body.created_by,
            client_name: req.body.client_name,
          });
          res.json({ message: 'Event updated successfully',status:true });
      }catch(err){
          res.status(500).json({ message: 'Internal server error' });
      }
  };