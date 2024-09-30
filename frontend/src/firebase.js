import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getAuth,signInWithPopup, GoogleAuthProvider  } from "firebase/auth";

// const firebaseConfig = {
//       apiKey: "AIzaSyAxIqlOXJY-kIuRaKgW_6otMfBHFXNaNdk",
//       authDomain: "connect-souq-414110.firebaseapp.com",
//       projectId: "connect-souq-414110",
//       databaseURL: "https://connect-souq-414110-default-rtdb.firebaseio.com",
//       storageBucket: "connect-souq-414110.appspot.com",
//       messagingSenderId: "625995147274",
//       appId: "1:625995147274:web:1503cc156322c7ee7f57f3",
//       measurementId: "G-N40YP8KLQC"
// };

const firebaseConfig = {
      apiKey: "AIzaSyCKLy3j2FQPhfgQgAa-f0nisbtx-gcVPcM",
      authDomain: "connectsouq-ed4eb.firebaseapp.com",
      projectId: "connectsouq-ed4eb",
      databaseURL: "https://connectsouq-ed4eb-default-rtdb.firebaseio.com",
      storageBucket: "connectsouq-ed4eb.appspot.com",
      messagingSenderId: "252691920626",
      appId: "1:252691920626:web:3604c881c7537c04fa826b",
      measurementId: "G-L7SVLL2L4J"
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const db = getDatabase(app);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider(app);

export { firestore,db,auth,googleAuthProvider};