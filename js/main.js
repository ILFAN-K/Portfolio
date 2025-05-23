/**
 * Main JavaScript file for Portfolio
 * Contains navigation, scrolling effects, and various UI interactions
 */

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize preloader
    initPreloader();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize category tabs for Education section
    initCategoryTabs();
    
    // Initialize certificate modal
    initCertificateModal();
});

/**
 * Initialize preloader
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
}

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');
    const header = document.querySelector('header');
    let overlay;
    
    // Create overlay element for mobile menu
    function createOverlay() {
        overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', () => {
            closeNavMenu();
        });
    }
    
    // Toggle navigation menu
    function toggleNavMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        if (!overlay) {
            createOverlay();
        }
        
        overlay.classList.toggle('active');
    }
    
    // Close navigation menu
    function closeNavMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
        
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
    
    // Hamburger menu event listener
    hamburger.addEventListener('click', toggleNavMenu);
    
    // Nav links click event listeners
    navLinksItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinksItems.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            item.classList.add('active');
            
            // Close mobile menu if it's open
            closeNavMenu();
            
            // Smooth scroll to section
            const targetId = item.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add box shadow to header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Initialize scroll effects
 */
function initScrollEffects() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links li a');
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const headerHeight = document.querySelector('header').offsetHeight;
            
            if (window.scrollY >= sectionTop - headerHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initial call to set active link
    updateActiveNavLink();
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Initialize category tabs for Education section
 */
function initCategoryTabs() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const categoryContents = document.querySelectorAll('.category-content');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get target content
            const targetId = btn.getAttribute('data-target');
            
            // Hide all content sections
            categoryContents.forEach(content => {
                content.classList.remove('active');
                setTimeout(() => {
                    content.style.display = 'none';
                }, 300);
            });
            
            // Show target content with animation
            const targetContent = document.getElementById(targetId);
            setTimeout(() => {
                targetContent.style.display = 'block';
                setTimeout(() => {
                    targetContent.classList.add('active');
                }, 10);
            }, 300);
        });
    });
}

/**
 * Initialize certificate modal
 */
function initCertificateModal() {
    const certButtons = document.querySelectorAll('.cert-btn');
    const modal = document.getElementById('certificate-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalTitle = document.getElementById('modal-cert-title');
    const modalIssuer = document.getElementById('modal-cert-issuer');
    const modalDate = document.getElementById('modal-cert-date');
    const modalImage = document.getElementById('modal-cert-image');
    
    // Open modal when certificate button is clicked
    certButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get certificate data from data attributes
            const title = button.getAttribute('data-cert-title');
            const issuer = button.getAttribute('data-cert-issuer');
            const date = button.getAttribute('data-cert-date');
            const image = button.getAttribute('data-cert-image');
            
            // Set modal content
            modalTitle.textContent = title;
            modalIssuer.textContent = issuer;
            modalDate.textContent = date;
            modalImage.src = image;
            
            // Show modal
            modal.classList.add('active');
            setTimeout(() => {
                modal.querySelector('.modal-content').style.opacity = '1';
                modal.querySelector('.modal-content').style.transform = 'translateY(0)';
            }, 10);
            
            // Prevent body scrolling
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when close button is clicked
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside of modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Close modal function
    function closeModal() {
        modal.querySelector('.modal-content').style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'translateY(-50px)';
        
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    }
}
