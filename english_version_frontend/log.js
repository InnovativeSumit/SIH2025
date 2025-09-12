     document.addEventListener('DOMContentLoaded', function() {
            // Login button functionality
            const loginBtn = document.querySelector('.login-btn');
            loginBtn.addEventListener('click', function() {
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                if (!email || !password) {
                    loginBtn.textContent = 'Please fill all fields!';
                    loginBtn.style.background = 'linear-gradient(to right, #F44336, #E57373)';
                    setTimeout(() => {
                        loginBtn.textContent = 'Login';
                        loginBtn.style.background = 'linear-gradient(45deg, #22c55e, #4ade80)';
                    }, 2000);
                } else {
                    loginBtn.textContent = 'Logging in...';
                    setTimeout(() => {
                        alert('Login successful!');
                        loginBtn.textContent = 'Login';
                    }, 1500);
                }
            });
            
            // Create account button functionality
            const signupBtn = document.querySelector('.signup-btn');
            signupBtn.addEventListener('click', function() {
                signupBtn.textContent = 'Redirecting...';
                setTimeout(() => {
                    // In a real application, this would redirect to the signup page
                    // window.location.href = 'sign_up.html';
                    signupBtn.textContent = 'Create Account';
                }, 1500);
            });
            
            // Add hover effect to container
            const container = document.querySelector('.container');
            container.addEventListener('mouseenter', function() {
                this.style.transform = 'translateZ(15px) scale(1.02)';
            });
            
            container.addEventListener('mouseleave', function() {
                this.style.transform = 'translateZ(10px) scale(1)';
            });
            
            // Enhanced 3D effect for logo on mouse move
            const logo = document.querySelector('.logo');
            document.addEventListener('mousemove', function(e) {
                const x = e.clientX / window.innerWidth - 0.5;
                const y = e.clientY / window.innerHeight - 0.5;
                
                logo.style.transform = `rotateY(${x * 15}deg) rotateX(${y * -15}deg) scale(1.05)`;
            });
        });