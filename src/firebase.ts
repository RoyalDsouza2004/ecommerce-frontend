
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


// const firebaseConfig = {
//       apiKey: import.meta.env.VITE_FIREBASE_KEY,
//       authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//       projectId: import.meta.env.VITE_PROJECT_ID,
//       storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//       messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//       appId: import.meta.env.VITE_APP_ID
// };


const firebaseConfig = {
  apiKey: "AIzaSyAnQ_5MJ2UpI3bgiXbpilRHIJfojYSpFdg",
  authDomain: "ecommerce-dc5ca.firebaseapp.com",
  projectId: "ecommerce-dc5ca",
  storageBucket: "ecommerce-dc5ca.firebasestorage.app",
  messagingSenderId: "500163112633",
  appId: "1:500163112633:web:95db7482bb0b4a998eb568"
};




export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)