// Import Firebase SDKs directly from Google’s CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVBUe1dLJpcxhBOalobGzjxEfHUbkK3zk",
  authDomain: "corporate-job-portal-8effc.firebaseapp.com",
  projectId: "corporate-job-portal-8effc",
  storageBucket: "corporate-job-portal-8effc.firebasestorage.app",
  messagingSenderId: "427084850716",
  appId: "1:427084850716:web:95af4f5594c9d2429021d9",
  measurementId: "G-CTVZHNEWGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Authentication
const auth = getAuth(app);

// Export for use in other scripts
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };

