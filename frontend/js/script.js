document.addEventListener('DOMContentLoaded', () => {
    let searchBtn = document.querySelector('#search-btn');
    let searchBar = document.querySelector('.search-bar-container');
    let formBtn = document.querySelector('#login-btn');
    let loginForm = document.querySelector('.login-form-container');
    let formClose = document.querySelector('#form-close');
    let menu = document.querySelector('#menu-bar');
    let navbar = document.querySelector('.navbar');

    // Handle mobile menu
    menu.addEventListener('click', () => {
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    });

    // Handle search functionality
    searchBtn.addEventListener('click', () => {
        searchBtn.classList.toggle('fa-times');
        searchBar.classList.toggle('active');
    });

    // Handle login form
    formBtn.addEventListener('click', () => {
        loginForm.classList.add('active');
    });

    formClose.addEventListener('click', () => {
        loginForm.classList.remove('active');
    });

    // Hide elements on scroll
    window.onscroll = () => {
        searchBtn.classList.remove('fa-times');
        searchBar.classList.remove('active');
        menu.classList.remove('fa-times');
        navbar.classList.remove('active');
        loginForm.classList.remove('active');
    };

    // Login form submission
    const loginFormEl = document.getElementById('loginForm');
    loginFormEl.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;
        
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, rememberMe })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Store token
                localStorage.setItem('token', data.token);
                // Show success message
                alert('Login successful!');
                // Hide login form
                loginForm.classList.remove('active');
                // You can redirect here if needed
                // window.location.href = '/dashboard';
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login');
        }
    });

    // Forgot password handler
    document.getElementById('forgotPassword').addEventListener('click', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        
        if (!email) {
            alert('Please enter your email address');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Forgot password error:', error);
            alert('An error occurred while processing your request');
        }
    });

    // Register link handler
    document.getElementById('registerLink').addEventListener('click', (e) => {
        e.preventDefault();
        // Add your registration logic here
        alert('Registration functionality coming soon!');
    });
});