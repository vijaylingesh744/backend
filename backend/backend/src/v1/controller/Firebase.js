var admin = require("firebase-admin");
var serviceAccount = require("../Utils/conect-souq.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://service-follow-default-rtdb.firebaseio.com',
})

exports.Pushnotify = (item,notify) => {
  const message = {
    data: {
      notify:JSON.stringify(notify),
    },
    token: item.device_token
  };

  admin.messaging().send(message)
    .then((response) => {
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
}