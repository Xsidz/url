
        const API_BASE_URL = 'http://localhost:3001/auth'; 
        
        // Global state
        let currentUser = null;
        let userUrls = [];

        // Initialize the app
        document.addEventListener('DOMContentLoaded', function() {
            checkAuthStatus();
            setupEventListeners();
        });

        // Check if user is logged in
        async function checkAuthStatus() {
            try {
                const response = await fetch(`${API_BASE_URL}/check-auth`, {
                    method: 'GET',
                    credentials: 'include', // Include cookies for JWT
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    currentUser = userData;
                    showUserMenu();
                    
                    if (window.location.hash === '#dashboard') {
                        showPage('dashboard');
                    }
                } else {
                    // User not authenticated
                    currentUser = null;
                    showAuthButtons();
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
                currentUser = null;
                showAuthButtons();
            }
        }

        // Show auth buttons
        function showAuthButtons() {
            document.getElementById('auth-buttons').style.display = 'flex';
            document.getElementById('user-menu').style.display = 'none';
        }

        // Setup event listeners
        function setupEventListeners() {
            // URL shortening form
            document.getElementById('shortenForm').addEventListener('submit', handleShortenUrl);
            
            // Login form
            document.getElementById('loginForm').addEventListener('submit', handleLogin);
            
            // Signup form
            document.getElementById('signupForm').addEventListener('submit', handleSignup);
        }

        // Show different pages
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Update URL hash
            window.location.hash = pageId;
            
            // Load dashboard data if needed
            if (pageId === 'dashboard' && currentUser) {
                loadUserUrls();
            }
        }

        // Handle URL shortening
        async function handleShortenUrl(e) {
            e.preventDefault();
            
            const longUrl = document.getElementById('longUrl').value;
            const submitBtn = document.querySelector('.btn-submit');
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Shortening...';
            
            try {
                const response = await fetch(`http://localhost:3001/new`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include', // Include cookies
                    body: JSON.stringify({
                        url: longUrl
                    })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    showResult(data.shortUrl, data.originalUrl);
                    showNotification('URL shortened successfully!', 'success');
                    
                    // Clear the form
                    document.getElementById('longUrl').value = '';
                } else {
                    showNotification(data.message || 'Error shortening URL', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('Network error occurred', 'error');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.textContent = 'Shorten URL';
            }
        }

        // Handle login
        async function handleLogin(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const submitBtn = document.querySelector('#loginForm .auth-btn');
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Logging in...';
            
            try {
                const response = await fetch(`${API_BASE_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include', // Include cookies
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    currentUser = data;
                    showUserMenu();
                    showPage('dashboard');
                    showNotification('Login successful!', 'success');
                    
                    // Clear form
                    document.getElementById('loginForm').reset();
                } else {
                    showNotification(data.message || 'Login failed', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('Network error occurred', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Login';
            }
        }

        // Handle signup
        async function handleSignup(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const submitBtn = document.querySelector('#signupForm .auth-btn');
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            
            if (password.length < 6) {
                showNotification('Password must be at least 6 characters', 'error');
                return;
            }
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Creating Account...';
            
            try {
                const response = await fetch(`${API_BASE_URL}/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include', // Include cookies
                    body: JSON.stringify({ fullName, email, password })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    currentUser = data;
                    showUserMenu();
                    showPage('dashboard');
                    showNotification('Account created successfully!', 'success');
                    
                    // Clear form
                    document.getElementById('signupForm').reset();
                } else {
                    showNotification(data.message || 'Signup failed', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('Network error occurred', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Sign Up';
            }
        }

        // Show user menu
        function showUserMenu() {
            document.getElementById('auth-buttons').style.display = 'none';
            document.getElementById('user-menu').style.display = 'flex';
            document.getElementById('welcome-text').textContent = `Welcome, ${currentUser.fullName || 'User'}`;
        }

        // Logout
        async function logout() {
            try {
                const response = await fetch(`${API_BASE_URL}/logout`, {
                    method: 'POST',
                    credentials: 'include', // Include cookies
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    currentUser = null;
                    showAuthButtons();
                    showPage('home');
                    showNotification('Logged out successfully', 'success');
                } else {
                    showNotification('Logout failed', 'error');
                }
            } catch (error) {
                console.error('Error during logout:', error);
                // Force logout on client side even if server request fails
                currentUser = null;
                showAuthButtons();
                showPage('home');
                showNotification('Logged out', 'success');
            }
        }

        // Load user URLs
        async function loadUserUrls() {
            const urlsList = document.getElementById('urlsList');
            
            if (!currentUser) {
                urlsList.innerHTML = '<p>Please log in to view your URLs.</p>';
                return;
            }
            
            try {
                // This would be implemented when you add URL management endpoints
                urlsList.innerHTML = '<p>User-specific URLs will be displayed here once URL management is implemented.</p>';
            } catch (error) {
                console.error('Error loading user URLs:', error);
                urlsList.innerHTML = '<p>Error loading URLs. Please try again.</p>';
            }
        }

        // Show result
        function showResult(shortUrl, originalUrl) {
            document.getElementById('shortUrl').value = shortUrl;
            document.getElementById('originalUrl').textContent = originalUrl;
            document.getElementById('result').classList.add('show');
        }

        // Copy to clipboard
        function copyToClipboard(text) {
            const textToCopy = text || document.getElementById('shortUrl').value;
            navigator.clipboard.writeText(textToCopy).then(() => {
                showNotification('URL copied to clipboard!', 'success');
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showNotification('URL copied to clipboard!', 'success');
                } catch (err) {
                    showNotification('Failed to copy URL', 'error');
                }
                document.body.removeChild(textArea);
            });
        }

        // Show notifications
        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }

        // Handle browser back/forward
        window.addEventListener('hashchange', function() {
            const hash = window.location.hash.substring(1);
            if (hash && document.getElementById(hash)) {
                showPage(hash);
            }
        });

        // Handle URL validation
        function isValidUrl(string) {
            try {
                new URL(string);
                return true;
            } catch (_) {
                return false;
            }
        }

        // Add URL validation to the form
        document.getElementById('longUrl').addEventListener('input', function() {
            const url = this.value;
            if (url && !isValidUrl(url)) {
                this.setCustomValidity('Please enter a valid URL');
            } else {
                this.setCustomValidity('');
            }
        });