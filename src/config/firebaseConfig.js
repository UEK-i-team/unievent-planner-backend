import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBcaalyPESHwdg_Gq7ezuXJKC-p9KndztU",
  authDomain: "auth-20a66.firebaseapp.com",
  projectId: "auth-20a66",
  storageBucket: "auth-20a66.appspot.com",
  messagingSenderId: "323908200672",    
  appId: "1:323908200672:web:ceb3ebe36816038fc00885",
  measurementId: "G-C6FZWMPVCW"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);