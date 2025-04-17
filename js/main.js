// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Navbar Scroll Effect
    // =============================================
    const header = document.querySelector('header');
    
    // Set initial transparent state on page load
    // This creates a clean, immersive entry point to the site
    header.classList.add('transparent');
    
    /**
     * Handle scroll event to toggle navbar appearance
     * 
     * Logic:
     * - When near the top (scrollY ≤ 50px): Use transparent navbar for clean aesthetics
     * - When scrolled down (scrollY > 50px): Add background & shadow for better readability
     *   as content scrolls beneath the navbar
     */
    const handleScroll = () => {
        if (window.scrollY > 50) {
            // User has scrolled down - add visual structure to navbar
            header.classList.remove('transparent');
            header.classList.add('scrolled');
        } else {
            // User is at/near the top - use transparent, minimal design
            header.classList.add('transparent');
            header.classList.remove('scrolled');
        }
    };
    
    // Apply correct navbar state immediately based on initial scroll position
    // This prevents flashing of transparent navbar if page is loaded scrolled down
    handleScroll();
    
    // Update navbar appearance whenever user scrolls
    window.addEventListener('scroll', handleScroll);
    
    // =============================================
    // Mobile Navigation Toggle
    // =============================================
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            // Toggle mobile navigation visibility
            navLinks.classList.toggle('active');
            
            /**
             * Handle navbar background for mobile menu
             * 
             * Logic:
             * - When mobile menu is open: Always show navbar background for better readability
             *   regardless of scroll position (mobile menus need consistent background)
             * - When mobile menu is closed: Only remove background if we're at the top and
             *   should be in transparent state
             */
            if (navLinks.classList.contains('active')) {
                // Mobile menu open - ensure navbar has background
                header.classList.add('mobile-active');
            } else {
                // Mobile menu closed - check if we should revert to transparent
                if (window.scrollY <= 50) {
                    header.classList.remove('mobile-active');
                }
            }
            
            // Toggle hamburger/close icon for better UX
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // =============================================
    // Enhanced Search Functionality
    // =============================================
    const searchTrigger = document.getElementById('search-trigger');
    const searchDropdown = document.querySelector('.search-dropdown');
    const searchInput = document.querySelector('.search-input');
    
    if (searchTrigger && searchDropdown) {
        /**
         * Dynamically adjust search dropdown position based on screen size
         * 
         * Logic:
         * - Very small screens (≤360px): Right-align the dropdown (right: 0)
         * - Mobile screens (≤480px): Slightly offset to center better (-30px)
         * - Tablet screens (≤768px): Position with moderate offset (-30px)
         * - Larger screens: Use CSS default positioning
         * 
         * This ensures the search dropdown is always optimally positioned
         * within the viewport regardless of device size.
         */
        const adjustSearchDropdownPosition = () => {
            // Reset to default position first
            searchDropdown.style.right = '';
            
            // Apply different positioning based on viewport width
            if (window.innerWidth <= 360) {
                // Very small screens - align with right edge
                searchDropdown.style.right = '0';
            } else if (window.innerWidth <= 480) {
                // Small mobile screens - center more
                searchDropdown.style.right = '-30px';
            } else if (window.innerWidth <= 768) {
                // Tablet screens - moderate positioning
                searchDropdown.style.right = '-30px';
            }
        };
        
        // Set initial position when page loads
        adjustSearchDropdownPosition();
        
        // Readjust whenever window is resized (orientation change, etc.)
        window.addEventListener('resize', adjustSearchDropdownPosition);
        
        /**
         * Toggle search dropdown visibility on click
         * 
         * Logic:
         * - If already visible: Hide with animation
         * - If hidden: Show with animation and focus the input field
         * 
         * This provides an accessible way to use the search on touch devices
         * while maintaining the hover functionality for desktop users.
         */
        searchTrigger.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            
            // Check current visibility state
            if (searchDropdown.style.visibility === 'visible') {
                // Hide the dropdown with animation
                searchDropdown.style.opacity = '0';
                searchDropdown.style.visibility = 'hidden';
                searchDropdown.style.transform = 'translateY(10px)';
            } else {
                // Ensure position is adjusted before showing
                adjustSearchDropdownPosition();
                
                // Show the dropdown with animation
                searchDropdown.style.opacity = '1';
                searchDropdown.style.visibility = 'visible';
                searchDropdown.style.transform = 'translateY(0)';
                
                // Auto-focus the input field for immediate typing
                // This improves UX by eliminating an extra click
                searchInput.focus();
            }
        });
        
        /**
         * Close search dropdown when clicking outside
         * 
         * Logic:
         * - Check if click target is outside the search area
         * - Only act if dropdown is currently visible
         * - Hide dropdown with animation when conditions met
         * 
         * This prevents the dropdown from staying open when
         * user clicks elsewhere on the page.
         */
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-icon') && 
                searchDropdown.style.visibility === 'visible') {
                searchDropdown.style.opacity = '0';
                searchDropdown.style.visibility = 'hidden';
                searchDropdown.style.transform = 'translateY(10px)';
            }
        });
    }
    
    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        
        dropdownLink.addEventListener('click', function(e) {
            // Prevent navigation on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Change dropdown icon based on state
                const icon = this.querySelector('i');
                if (icon.classList.contains('fa-chevron-down')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-nav-toggle')) {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // Reset hamburger icon
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                
                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                    const icon = dropdown.querySelector('i');
                    if (icon && icon.classList.contains('fa-chevron-up')) {
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    }
                });
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            
            // Reset hamburger icon
            const hamburgerIcon = mobileNavToggle.querySelector('i');
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
            
            // Close all dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                const icon = dropdown.querySelector('i');
                if (icon && icon.classList.contains('fa-chevron-up')) {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });
        }
    });
    
    // Logo size adjustment on scroll for desktop
    window.addEventListener('scroll', function() {
        if (window.innerWidth > 768) {
            const logo = document.querySelector('.logo');
            if (window.scrollY > 50) {
                logo.style.fontSize = '1.2rem';
            } else {
                logo.style.fontSize = '1.5rem';
            }
        }
    });
    
    // =============================================
    // Hero Section Enhancements
    // =============================================
    
    console.log('Learn It platform initialized');

    // Hero illustration carousel
    const heroIllustration = document.querySelector('.hero-illustration img');
    const illustrations = [
        'assets/hero-illustration.svg',
        'assets/hero-illustration-2.svg',
        'assets/hero-illustration-3.svg'
    ];
    let currentIllustration = 0;
    let isPlaying = true;
    let carouselInterval;

    function rotateIllustration() {
        currentIllustration = (currentIllustration + 1) % illustrations.length;
        updateCarousel();
    }

    function updateCarousel() {
        // Update image with smooth fade transition
        heroIllustration.style.opacity = '0';
        setTimeout(() => {
            heroIllustration.src = illustrations[currentIllustration];
            // Adjust image dimensions for the larger SVGs
            heroIllustration.style.maxHeight = '350px';
            heroIllustration.style.objectFit = 'contain';
            heroIllustration.style.opacity = '1';
        }, 300);
        
        // Update dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            if (index === currentIllustration) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function startCarousel() {
        carouselInterval = setInterval(rotateIllustration, 5000);
        isPlaying = true;
        document.querySelector('.carousel-play').classList.remove('paused');
    }

    function pauseCarousel() {
        clearInterval(carouselInterval);
        isPlaying = false;
        document.querySelector('.carousel-play').classList.add('paused');
    }

    // Initialize carousel
    startCarousel();
    // Set initial image styling for larger SVGs
    heroIllustration.style.maxHeight = '350px';
    heroIllustration.style.objectFit = 'contain';
    heroIllustration.style.transition = 'opacity 0.5s ease-in-out';

    // Add event listeners to dots
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', () => {
            currentIllustration = parseInt(dot.getAttribute('data-index'));
            updateCarousel();
            
            // Reset timer if playing
            if (isPlaying) {
                clearInterval(carouselInterval);
                startCarousel();
            }
        });
    });

    // Add event listener to play/pause button
    document.querySelector('.carousel-play').addEventListener('click', () => {
        if (isPlaying) {
            pauseCarousel();
        } else {
            startCarousel();
        }
    });
    
    // =============================================
    // Learning Path Quiz Implementation
    // =============================================
    
    // Quiz data structure - questions and possible results
    const quizData = {
        steps: [
            {
                title: "What do you want to achieve?",
                options: [
                    "Start a new career in tech",
                    "Advance in my current role",
                    "Learn specific skills for a project",
                    "Explore new topics out of curiosity"
                ]
            },
            {
                title: "What's your current experience level?",
                options: [
                    "Complete beginner",
                    "Some basic knowledge",
                    "Intermediate skills",
                    "Advanced practitioner"
                ]
            },
            {
                title: "How much time can you commit weekly?",
                options: [
                    "1-3 hours",
                    "4-6 hours",
                    "7-10 hours",
                    "10+ hours"
                ]
            }
        ],
        results: [
            {
                title: "Web Development Path",
                description: "Based on your answers, we recommend our structured web development track that will take you from beginner to job-ready professional.",
                courses: [1, 4, 5]
            },
            {
                title: "Data Science Journey",
                description: "Your profile matches our data science curriculum, designed to build your analytical skills progressively.",
                courses: [2, 6]
            },
            {
                title: "Flexible Learning Plan",
                description: "We suggest a customized learning approach focusing on specific skills that align with your goals and time constraints.",
                courses: [3, 5]
            },
            {
                title: "Career Advancement Track",
                description: "Our professional development path will help you level up your existing skills and prepare for your next career move.",
                courses: [2, 3, 6]
            }
        ]
    };
    
    // Initialize quiz functionality
    const quizInit = () => {
        const quizSteps = document.querySelectorAll('.quiz-steps .step');
        const quizContent = document.querySelector('.quiz-content');
        const quizImage = document.querySelector('.quiz-image img');
        
        if (!quizSteps.length || !quizContent) return; // Exit if quiz elements don't exist
        
        let currentStep = 0;
        const userAnswers = [];
        
        // Function to update quiz content based on current step
        const updateQuizContent = () => {
            // Update steps UI
            quizSteps.forEach((step, index) => {
                if (index === currentStep) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
            
            // If we're at results step
            if (currentStep === 3) {
                showQuizResults();
                return;
            }
            
            // Update question and options
            const stepData = quizData.steps[currentStep];
            quizContent.innerHTML = `
                <h3>${stepData.title}</h3>
                <div class="quiz-options">
                    ${stepData.options.map(option => 
                        `<div class="quiz-option">${option}</div>`
                    ).join('')}
                </div>
            `;
            
            // Add event listeners to new options
            const options = quizContent.querySelectorAll('.quiz-option');
            options.forEach((option, index) => {
                option.addEventListener('click', () => {
                    userAnswers[currentStep] = index;
                    
                    // Highlight selected option
                    options.forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                    
                    // Auto-advance after short delay
                    setTimeout(() => {
                        currentStep++;
                        updateQuizContent();
                    }, 500);
                });
            });
        };
        
        // Function to show quiz results
        const showQuizResults = () => {
            // Simple algorithm to determine result based on user answers
            // For demo purposes, we'll use a weighted approach
            let resultIndex = 0;
            
            // Check first answer (goal) - heavily weighted
            if (userAnswers[0] === 0) resultIndex = 0; // New career -> Web Dev
            else if (userAnswers[0] === 1) resultIndex = 3; // Advance role -> Career
            else if (userAnswers[0] === 2) resultIndex = 2; // Specific skills -> Flexible
            else if (userAnswers[0] === 3) resultIndex = 1; // Curiosity -> Data Science
            
            // Adjust based on experience if needed
            if (userAnswers[1] >= 2 && resultIndex === 0) resultIndex = 3; // More experienced -> Career
            
            // Adjust based on time commitment
            if (userAnswers[2] <= 1 && resultIndex !== 2) resultIndex = 2; // Less time -> Flexible
            
            const result = quizData.results[resultIndex];
            
            // Display result
            quizContent.innerHTML = `
                <h3>Your Recommended Path</h3>
                <div class="quiz-result">
                    <h4>${result.title}</h4>
                    <p>${result.description}</p>
                    <div class="recommended-courses">
                        <h5>Recommended Courses:</h5>
                        <div class="course-chips">
                            ${result.courses.map(courseId => {
                                // Find course by ID from courses array (defined in data.js)
                                const course = typeof courses !== 'undefined' ? 
                                    courses.find(c => c.id === courseId) : 
                                    { title: `Course ${courseId}` };
                                return `<div class="course-chip">${course.title}</div>`;
                            }).join('')}
                        </div>
                        <button class="btn primary-btn">View Full Learning Path</button>
                    </div>
                </div>
            `;
            
            // Change the image to results image
            quizImage.src = 'assets/quiz-result.svg';
            
            // Add restart quiz button
            const restartButton = document.createElement('button');
            restartButton.className = 'btn secondary-btn restart-quiz';
            restartButton.textContent = 'Restart Quiz';
            quizContent.appendChild(restartButton);
            
            restartButton.addEventListener('click', () => {
                currentStep = 0;
                userAnswers.length = 0;
                quizImage.src = 'assets/find-path.svg';
                updateQuizContent();
            });
        };
        
        // Initialize quiz with first question
        updateQuizContent();
    };
    
    // Initialize quiz if elements exist
    quizInit();
});

// =============================================
// Custom Dotted Background
// =============================================
// This function has been replaced with a CSS-based solution
// Background is now created with CSS radial-gradient 

// Quiz Functionality
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
});

function initQuiz() {
    const optionButtons = document.querySelectorAll('.quiz-option button');
    
    if (optionButtons.length) {
        optionButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove selected class from all buttons
                optionButtons.forEach(btn => {
                    btn.classList.remove('selected');
                });
                
                // Add selected class to clicked button
                this.classList.add('selected');
                
                // Here you would typically handle advancing to the next question
                // or saving the user's selection
            });
        });
    }
} 