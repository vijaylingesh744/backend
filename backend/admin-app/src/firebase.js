import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
      apiKey: "AIzaSyAxIqlOXJY-kIuRaKgW_6otMfBHFXNaNdk",
      authDomain: "connect-souq-414110.firebaseapp.com",
      projectId: "connect-souq-414110",
      databaseURL: "https://connect-souq-414110-default-rtdb.firebaseio.com",
      storageBucket: "connect-souq-414110.appspot.com",
      messagingSenderId: "625995147274",
      appId: "1:625995147274:web:1503cc156322c7ee7f57f3",
      measurementId: "G-N40YP8KLQC"
};
// const firebaseConfig ={
//       apiKey: "AIzaSyCYZ0sBiGOIpBUB_41m6If4RYX8azhDoR8",
//       authDomain: "connect-souq.firebaseapp.com",
//       databaseURL: "https://connect-souq-default-rtdb.firebaseio.com",
//       projectId: "connect-souq",
//       storageBucket: "connect-souq.appspot.com",
//       messagingSenderId: "537684806766",
//       appId: "1:537684806766:web:b60e2457872b3796996a7f",
//       measurementId: "G-QZ26WXRDXL"
// };
    
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const db = getDatabase(app);

export { firestore,db };