 //profile dropdown
 document.addEventListener('DOMContentLoaded', function() {
            const profileButton = document.querySelector('.profile');
            const dropdown = document.querySelector('.profile-dropdown');
            
            // Toggle dropdown when profile is clicked
            profileButton.addEventListener('click', function(e) {
                e.stopPropagation();
                dropdown.classList.toggle('active');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target) && !profileButton.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
            
            // Prevent closing when clicking inside dropdown
            dropdown.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            // Add functionality to buttons
            document.querySelector('.btn-edit').addEventListener('click', function() {
                alert('Edit profile option clicked!');
                dropdown.classList.remove('active');
            });
            
            document.querySelector('.btn-logout').addEventListener('click', function() {
                alert('Logging out...');
                dropdown.classList.remove('active');
            });
        });
 
 
 
 
 
 
 
 // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const sidebar = document.querySelector('.sidebar');
        
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // Navigation between sections
        const navLinks = document.querySelectorAll('.nav-link');
        const contentSections = document.querySelectorAll('.content-section');
        
        // Function to show a specific section
        function showSection(sectionId) {
            // Remove active class from all links and sections
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to the clicked link
            document.querySelector(`.nav-link[data-section="${sectionId}"]`).classList.add('active');
            
            // Show corresponding section
            document.getElementById(sectionId).classList.add('active');
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
            
            // Scroll to top of the page
            window.scrollTo(0, 0);
        }
        
        // Set up event listeners for navigation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const sectionId = link.getAttribute('data-section');
                if (sectionId) {
                    showSection(sectionId);
                } else if (link.getAttribute('href') === '#') {
                    // Handle logout
                    alert('Logging out...');
                }
            });
        });

        // Soil image upload functionality
        const soilImageUpload = document.getElementById('soil-image-upload');
        const soilImagePreview = document.getElementById('soil-image-preview');
        
        if (soilImageUpload) {
            soilImageUpload.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        soilImagePreview.src = e.target.result;
                        soilImagePreview.style.display = 'block';
                    }
                    reader.readAsDataURL(file);
                }
            });
        }

        // Crop prediction form submission
        const predictionForm = document.getElementById('crop-prediction-form');
        const predictionResult = document.getElementById('prediction-result');
        const resultText = document.getElementById('result-text');
        
        if (predictionForm) {
            predictionForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Simple mock prediction (in a real app, this would call an API)
                const soilType = document.getElementById('soil-type').value;
                const temperature = document.getElementById('temperature').value;
                
                let crop = "Corn"; // Default
                
                if (soilType === "clay" && temperature > 20) {
                    crop = "Rice";
                } else if (soilType === "sandy" && temperature > 25) {
                    crop = "Millet";
                } else if (soilType === "loamy") {
                    crop = "Wheat";
                }
                
                resultText.textContent = `Based on your farm conditions, we recommend planting ${crop} for optimal yield.`;
                predictionResult.style.display = 'block';
                
                // Scroll to results
                predictionResult.scrollIntoView({ behavior: 'smooth' });
            });
        }

        // FAQ functionality
        const faqSelect = document.getElementById('faq-select');
        const faqAnswers = document.querySelectorAll('.faq-answer');
        
        if (faqSelect) {
            faqSelect.addEventListener('change', () => {
                const selectedFaq = faqSelect.value;
                
                // Hide all answers
                faqAnswers.forEach(answer => {
                    answer.style.display = 'none';
                });
                
                // Show selected answer
                if (selectedFaq) {
                    document.getElementById(selectedFaq).style.display = 'block';
                }
            });
        }

        // Contact form submission
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            });
        }

        // Market region selector
        const marketRegion = document.getElementById('market-region');
        
        if (marketRegion) {
            marketRegion.addEventListener('change', () => {
                // In a real app, this would fetch data for the selected region
                alert(`Loading market data for ${marketRegion.options[marketRegion.selectedIndex].text}`);
            });
        }

        // Weather location selector
        const weatherLocation = document.getElementById('weather-location');
        
        if (weatherLocation) {
            weatherLocation.addEventListener('change', () => {
                // In a real app, this would fetch weather for the new location
                alert(`Loading weather data for ${weatherLocation.value}`);
            });
        }
         // Select elements
        const aiToggleButton = document.querySelector('.toggle-ai');
        const chatWindow = document.querySelector('.ai-chat-window');
        const closeChatBtn = document.querySelector('.close-chat');

        // Toggle chat window with robot button
        aiToggleButton.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });

        // Close chat with × button
        closeChatBtn.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });
