/**
 * Animations JavaScript file for Portfolio
 * Contains 3D animations, hover effects, and scroll animations
 */

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize 3D hover effects for project cards
    init3DProjectCards();
    
    // Initialize skill card hover effects
    initSkillCardEffects();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize interactive cube animation
    initInteractiveCube();
});

/**
 * Initialize 3D hover effects for project cards
 */
function init3DProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add mousemove event for 3D tilt effect
        card.addEventListener('mousemove', (e) => {
            const projectBox = card.querySelector('.project-box');
            const cardRect = card.getBoundingClientRect();
            
            // Calculate mouse position relative to card
            const mouseX = e.clientX - cardRect.left;
            const mouseY = e.clientY - cardRect.top;
            
            // Calculate rotation values
            const rotateY = ((mouseX / cardRect.width) - 0.5) * 10;
            const rotateX = ((mouseY / cardRect.height) - 0.5) * -10;
            
            // Apply the 3D tilt effect only if not flipped
            if (!projectBox.style.transform.includes('rotateY(180deg)')) {
                projectBox.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            const projectBox = card.querySelector('.project-box');
            
            // Reset to default position with a smooth transition
            if (!projectBox.style.transform.includes('rotateY(180deg)')) {
                projectBox.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            }
        });
        
        // Handle click for small devices
        card.addEventListener('click', (e) => {
            // Only activate on small screens
            if (window.innerWidth <= 768) {
                const projectBox = card.querySelector('.project-box');
                
                // Toggle the rotation
                if (projectBox.style.transform.includes('rotateY(180deg)')) {
                    projectBox.style.transform = 'rotateY(0deg)';
                } else {
                    projectBox.style.transform = 'rotateY(180deg)';
                }
                
                // Prevent click on buttons to allow card to flip back
                if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('a') || e.target.closest('button')) {
                    e.stopPropagation();
                }
            }
        });
        
        // Prevent default flip on button clicks for small devices
        const buttons = card.querySelectorAll('a, button');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.stopPropagation();
                }
            });
        });
    });
}

/**
 * Initialize skill card hover effects
 */
function initSkillCardEffects() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            
            // Calculate mouse position relative to card
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate rotation values
            const rotateY = ((mouseX / rect.width) - 0.5) * 20;
            const rotateX = ((mouseY / rect.height) - 0.5) * -20;
            
            // Apply the 3D tilt effect
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Add light reflection effect
            const shine = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`;
            item.style.backgroundImage = shine;
        });
        
        // Reset on mouse leave
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            item.style.backgroundImage = 'none';
        });
    });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    // Elements to animate on scroll
    const animatedElements = [
        { elements: document.querySelectorAll('.section-header'), animation: 'fadeInDown' },
        { elements: document.querySelectorAll('.about-text'), animation: 'fadeInLeft' },
        { elements: document.querySelectorAll('.skills-container'), animation: 'fadeInRight' },
        { elements: document.querySelectorAll('.project-card'), animation: 'fadeInUp' },
        { elements: document.querySelectorAll('.timeline-item'), animation: 'fadeInUp' },
        { elements: document.querySelectorAll('.cert-card'), animation: 'fadeInUp' },
        { elements: document.querySelectorAll('.contact-info'), animation: 'fadeInLeft' },
        { elements: document.querySelectorAll('.contact-form-container'), animation: 'fadeInRight' }
    ];
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Add animation class when element is in viewport
    function animateOnScroll() {
        animatedElements.forEach(item => {
            item.elements.forEach(element => {
                if (isInViewport(element) && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                    element.style.animation = `${item.animation} 1s ease forwards`;
                }
            });
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check on load
    animateOnScroll();
}

/**
 * Initialize interactive cube animation
 */
function initInteractiveCube() {
    const cube = document.querySelector('.cube');
    const container = document.querySelector('.cube-container');
    
    if (!cube || !container) return;
    
    let isAutoRotating = true;
    let rotateX = 0;
    let rotateY = 0;
    let rotateZ = 0;
    
    // Auto-rotation animation
    function autoRotate() {
        if (!isAutoRotating) return;
        
        rotateX += 0.2;
        rotateY += 0.3;
        rotateZ += 0.1;
        
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
        
        requestAnimationFrame(autoRotate);
    }
    
    // Start auto-rotation
    autoRotate();
    
    // Variables for mouse/touch control
    let isDragging = false;
    let previousTouchX = 0;
    let previousTouchY = 0;
    
    // Enable mouse/touch control
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        isAutoRotating = false;
        previousTouchX = e.clientX;
        previousTouchY = e.clientY;
        container.style.cursor = 'grabbing';
    });
    
    // Handle mouse movement for rotation
    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const touchX = e.clientX;
        const touchY = e.clientY;
        
        const deltaX = touchX - previousTouchX;
        const deltaY = touchY - previousTouchY;
        
        rotateY += deltaX * 0.5;
        rotateX -= deltaY * 0.5;
        
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
        
        previousTouchX = touchX;
        previousTouchY = touchY;
    });
    
    // Handle end of interaction
    window.addEventListener('mouseup', () => {
        isDragging = false;
        container.style.cursor = 'grab';
        
        // Resume auto-rotation after a delay
        setTimeout(() => {
            isAutoRotating = true;
            autoRotate();
        }, 3000);
    });
    
    // Touch events for mobile
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        isAutoRotating = false;
        previousTouchX = e.touches[0].clientX;
        previousTouchY = e.touches[0].clientY;
        e.preventDefault();
    });
    
    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        
        const deltaX = touchX - previousTouchX;
        const deltaY = touchY - previousTouchY;
        
        rotateY += deltaX * 0.5;
        rotateX -= deltaY * 0.5;
        
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
        
        previousTouchX = touchX;
        previousTouchY = touchY;
    });
    
    window.addEventListener('touchend', () => {
        isDragging = false;
        
        // Resume auto-rotation after a delay
        setTimeout(() => {
            isAutoRotating = true;
            autoRotate();
        }, 3000);
    });
    
    // When leaving container, resume auto-rotation
    container.addEventListener('mouseleave', () => {
        isDragging = false;
        container.style.cursor = 'grab';
        
        // Resume auto-rotation after a delay
        setTimeout(() => {
            isAutoRotating = true;
            autoRotate();
        }, 1000);
    });
    
    // Initial cursor style
    container.style.cursor = 'grab';
}
