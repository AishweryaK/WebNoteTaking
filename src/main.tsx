import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAGp4846wukGlfR_NygIPGPpjIxCjRUp7s",
//   authDomain: "notetakingapp-2cff4.firebaseapp.com",
//   projectId: "notetakingapp-2cff4",
//   storageBucket: "notetakingapp-2cff4.appspot.com",
//   messagingSenderId: "630539047377",
//   appId: "1:630539047377:web:b23c271249ebd8b4a150f0",
//   measurementId: "G-2LLHH56SL0"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
