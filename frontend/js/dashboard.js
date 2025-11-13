// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { 
    getAuth, 
    signOut,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Firebase configuration
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

// DOM Elements
const userNameElement = document.getElementById('userName');
const userEmailElement = document.getElementById('userEmail');
const userTypeElement = document.getElementById('userType');
const userPhotoElement = document.getElementById('userPhoto');
const defaultAvatar = document.getElementById('defaultAvatar');
const welcomeMessage = document.getElementById('welcomeMessage');
const welcomeUserName = document.getElementById('welcomeUserName');
const welcomeUserEmail = document.getElementById('welcomeUserEmail');
const logoutBtn = document.getElementById('logoutBtn');

// Stats elements
const applicationsCount = document.getElementById('applicationsCount');
const interviewsCount = document.getElementById('interviewsCount');
const savedJobsCount = document.getElementById('savedJobsCount');
const profileViews = document.getElementById('profileViews');

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        loadUserData(user);
        initializeDashboard();
    } else {
        // User is signed out, redirect to login
        window.location.href = 'login.html';
    }
});

// Load user data from localStorage and Firebase
function loadUserData(user) {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Display user information
    const displayName = user.displayName || userData.displayName || 'User';
    const email = user.email || userData.email || 'No email provided';
    const userType = userData.userType || 'job-seeker';
    const photoURL = user.photoURL || userData.photoURL;

    // Update all user info elements
    userNameElement.textContent = displayName;
    userEmailElement.textContent = email;
    userTypeElement.textContent = userType === 'employer' ? 'Employer' : 'Job Seeker';
    
    welcomeMessage.textContent = `Welcome, ${displayName.split(' ')[0]}!`;
    welcomeUserName.textContent = `Welcome back, ${displayName}!`;
    welcomeUserEmail.textContent = email;

    // Handle profile photo
    if (photoURL) {
        userPhotoElement.src = photoURL;
        userPhotoElement.style.display = 'block';
        defaultAvatar.style.display = 'none';
    } else {
        userPhotoElement.style.display = 'none';
        defaultAvatar.style.display = 'flex';
    }

    // Update page title
    document.title = `${displayName} - Dashboard | Corporate Job Portal`;
}

// Initialize dashboard with sample data
function initializeDashboard() {
    // Sample data - in a real app, this would come from a database
    applicationsCount.textContent = '12';
    interviewsCount.textContent = '3';
    savedJobsCount.textContent = '8';
    profileViews.textContent = '45';

    // Sample recent activity
    const recentActivity = document.getElementById('recentActivity');
    recentActivity.innerHTML = `
        <div class="activity-item border-bottom pb-3 mb-3">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h6 class="mb-1">Application Submitted</h6>
                    <p class="text-muted mb-1">Frontend Developer at TechNova Solutions</p>
                    <small class="text-muted">2 hours ago</small>
                </div>
                <span class="badge bg-success">Submitted</span>
            </div>
        </div>
        <div class="activity-item border-bottom pb-3 mb-3">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h6 class="mb-1">Profile Viewed</h6>
                    <p class="text-muted mb-1">Your profile was viewed by a recruiter</p>
                    <small class="text-muted">1 day ago</small>
                </div>
                <span class="badge bg-info">Viewed</span>
            </div>
        </div>
        <div class="activity-item">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h6 class="mb-1">Job Saved</h6>
                    <p class="text-muted mb-1">Data Analyst at DataWorks Inc.</p>
                    <small class="text-muted">2 days ago</small>
                </div>
                <span class="badge bg-warning text-dark">Saved</span>
            </div>
        </div>
    `;
}

// Logout functionality
logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Logout error:', error);
        alert('Error signing out. Please try again.');
    }
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Update last active time
    setInterval(() => {
        const now = new Date();
        document.getElementById('lastActive').textContent = 
            `Last active: ${now.toLocaleTimeString()}`;
    }, 60000);
});

// Export functions for potential use in other modules
export { auth, loadUserData };