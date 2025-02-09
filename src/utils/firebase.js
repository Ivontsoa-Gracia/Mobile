// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Remplacez ces valeurs par celles fournies par la console Firebase pour votre application web.
const firebaseConfig = {
  apiKey: "AIzaSyCEtmI2jnctGGaedrO78WVDLehcopvf5y0", 
  authDomain: "authentification-92730.firebaseapp.com",
  projectId: "authentification-92730",
  storageBucket: "authentification-92730.appspot.com",
  messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
  appId: "VOTRE_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
