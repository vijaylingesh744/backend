const express = require("express");
const cors = require("cors");
const config = require('./src/config.js');
const mongoConnection = require('./db/mongoConnection.js');
const { Server } = require('socket.io');

require("dotenv").config();
const app = express();
app.use(express.static(__dirname + "/uploads"));
app.use(cors());

const PORT = process.env.PORT || 5000;
mongoConnection.initialize()
  .then(() => {
    var expressConfig = require('./src/expressconfig.js');
    expressConfig.configureExpressApp(app)
  }).then(() => {
    const server = app.listen(PORT, () => {
      console.info(`Server up and running... \n API service now available at `.bold.green + `http://localhost:${PORT}/api/${config.API_VERSION}`.bold.magenta.underline + `\n`);
  }).on('error',(e)=>{
      console.log('Error happened: ', e.message)
  });

  const io = new Server(server, {
    cors: {
      origin: (origin, callback) => {
        const allowedOrigins = [
          'http://localhost:3000',
          'https://connectsouq.com'
        ];
        
        if (allowedOrigins.includes(origin) || !origin) {
          callback(null, true); // Allow the origin
        } else {
          callback(new Error('Not allowed by CORS')); // Deny the origin
        }
      },
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.on('sendNotification', async(condobject) => {
      io.emit(condobject.receive+"N", condobject);
    });
    socket.on('sendConnection', async(data) => {
      io.emit(data.rec_id, data);
      io.emit(data.user, data);
    });
    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
  });
})
 
