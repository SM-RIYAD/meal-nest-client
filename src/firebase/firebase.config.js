// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId:import.meta.env.VITE_projectId,
  storageBucket:import.meta.env.VITE_storageBucket,
  messagingSenderId:import.meta.env.VITE_messagingSenderId,
  appId:import.meta.env.VITE_appId 
};
// const firebaseConfig = {
//   apiKey: "AIzaSyD26eyaGPQg1vh-nL_x8TKR0Ku96Fv6lUc",
//   authDomain: "job-sphere.firebaseapp.com",
//   projectId: "job-sphere",
//   storageBucket: "job-sphere.appspot.com",
//   messagingSenderId: "866742390880",
//   appId: "1:866742390880:web:27a0be171b6171f39f7305"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;