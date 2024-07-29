import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAGp4846wukGlfR_NygIPGPpjIxCjRUp7s',
//   authDomain: 'notetakingapp-2cff4.firebaseapp.com',
//   projectId: 'notetakingapp-2cff4',
//   storageBucket: 'notetakingapp-2cff4.appspot.com',
//   messagingSenderId: '630539047377',
//   appId: '1:630539047377:web:b23c271249ebd8b4a150f0',
//   measurementId: 'G-2LLHH56SL0',
// };

const firebaseConfig = {
  apiKey: "AIzaSyAGp4846wukGlfR_NygIPGPpjIxCjRUp7s",
  authDomain: "notetakingapp-2cff4.firebaseapp.com",
  projectId: "notetakingapp-2cff4",
  storageBucket: "notetakingapp-2cff4.appspot.com",
  messagingSenderId: "630539047377",
  appId: "1:630539047377:web:1848c25b607f2a88a150f0",
  measurementId: "G-BTGJ6FB742"
};

const app = initializeApp(firebaseConfig);

// provider.setCustomParameters({
//   prompt: 'select_account ',
// });
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage();
// export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export default app;
