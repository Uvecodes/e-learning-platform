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
    if (heroIllustration) {
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
        const carouselPlay = document.querySelector('.carousel-play');
        if (carouselPlay) {
            carouselPlay.addEventListener('click', () => {
                if (isPlaying) {
                    pauseCarousel();
                } else {
                    startCarousel();
                }
            });
        }
    }
}); 