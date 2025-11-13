// Import Firebase SDK modules
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

// Your Firebase configuration
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
const auth = getAuth(app);
const db = getFirestore(app);

// Handle registration form submission
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get input values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const role = document.getElementById("role").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    // Step 1: Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Step 2: Store additional user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      phone: phone,
      role: role,
      createdAt: serverTimestamp()
    });

    alert("✅ Registration successful!");
    registerForm.reset();

    // Optionally redirect to login page
    window.location.href = "signin.html";
  } catch (error) {
    console.error("Error registering user:", error);
    alert("❌ Error: " + error.message);
  }
});
