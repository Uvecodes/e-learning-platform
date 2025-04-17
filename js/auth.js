// Wait for the DOM to be fully loaded before executing any code
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the login and signup forms
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // If login form exists, add submit event listener
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // If signup form exists, add submit event listener
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});

// Function to handle login form submission
function handleLogin(e) {
    // Prevent the default form submission behavior
    e.preventDefault();
    
    // Get form input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Validate that all required fields are filled
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Create user data object (in a real app, this would come from a backend API)
    const userData = {
        email: email,
        name: email.split('@')[0], // Extract username from email address
        isAuthenticated: true
    };

    // Store user data based on "Remember Me" selection
    if (rememberMe) {
        // Store in localStorage for persistent login
        localStorage.setItem('userData', JSON.stringify(userData));
    } else {
        // Store in sessionStorage for session-only login
        sessionStorage.setItem('userData', JSON.stringify(userData));
    }

    // Redirect to profile page after successful login
    window.location.href = 'profile.html';
}

// Function to handle signup form submission
function handleSignup(e) {
    // Prevent the default form submission behavior
    e.preventDefault();
    
    // Get form input values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;

    // Validate that all required fields are filled
    if (!fullName || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Check if terms and conditions are accepted
    if (!terms) {
        alert('Please accept the terms and conditions');
        return;
    }

    // Create user data object (in a real app, this would be sent to a backend API)
    const userData = {
        name: fullName,
        email: email,
        isAuthenticated: true
    };

    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

    // Redirect to profile page after successful registration
    window.location.href = 'profile.html';
}

// Function to check if user is authenticated
function checkAuth() {
    // Try to get user data from either localStorage or sessionStorage
    const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
    
    // If no user data found, redirect to login page
    if (!userData) {
        window.location.href = 'login.html';
        return null;
    }
    
    // Return parsed user data
    return JSON.parse(userData);
}

// Function to handle user logout
function logout() {
    // Remove user data from both storage types
    localStorage.removeItem('userData');
    sessionStorage.removeItem('userData');
    
    // Redirect to login page
    window.location.href = 'login.html';
} 