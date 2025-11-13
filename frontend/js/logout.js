import { auth, signOut } from './firebase-config.js';

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("👋 Logged out successfully!");
    window.location.href = "login.html";
  } catch (error) {
    alert("❌ " + error.message);
  }
});
