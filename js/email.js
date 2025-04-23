/**
 * Email JavaScript file for Portfolio
 * Handles the contact form submission using EmailJS
 */

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with public key
    (function() {
        // Initialize EmailJS with your public key
        // In a real environment, you'd use the provided service ID from environment variables
        emailjs.init("CADtR_uqY79dm8Inv");
    })();
    
    // Initialize contact form
    initContactForm();
});

/**
 * Initialize contact form functionality
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.querySelector('.success-message');
    const errorMessage = document.querySelector('.error-message');
    
    if (!contactForm) return;
    
    // Hide both messages initially
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="btn-icon"><i class="fas fa-spinner fa-spin"></i></div><span class="btn-text">Sending...</span>';
        submitBtn.disabled = true;
        
        // Hide any existing messages
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Prepare template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        };
        
        // Send the email
        // Replace these IDs with your actual EmailJS service, template, and user IDs
        emailjs.send('service_nwj51el', 'template_17hjtm3', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                successMessage.style.display = 'flex';
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }, function(error) {
                console.log('FAILED...', error);
                
                // Show error message
                errorMessage.style.display = 'flex';
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Hide error message after 5 seconds
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 5000);
            });
    });
}

/**
 * Validate form data
 * 
 * @param {string} name - User's name
 * @param {string} email - User's email
 * @param {string} subject - Email subject
 * @param {string} message - Email message
 * @returns {boolean} - Whether the form data is valid
 */
function validateForm(name, email, subject, message) {
    // Check if all fields are filled
    if (!name || !email || !subject || !message) {
        return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false;
    }
    
    return true;
}

/**
 * Add additional form validation on input fields
 */
function addFormValidation() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Array of form inputs
    const formInputs = [nameInput, emailInput, subjectInput, messageInput];
    
    // Add blur event listeners to validate inputs
    formInputs.forEach(input => {
        if (!input) return;
        
        input.addEventListener('blur', function() {
            validateInput(input);
        });
        
        input.addEventListener('input', function() {
            // Remove error styling if user starts typing again
            input.classList.remove('error');
            
            // If it was showing an error message, hide it
            const errorElement = input.parentElement.querySelector('.input-error');
            if (errorElement) {
                errorElement.remove();
            }
        });
    });
}

/**
 * Validate individual input field
 * 
 * @param {HTMLElement} input - Input element to validate
 */
function validateInput(input) {
    // Check if input is empty
    if (!input.value.trim()) {
        showInputError(input, 'This field is required');
        return;
    }
    
    // Email validation
    if (input.id === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            showInputError(input, 'Please enter a valid email address');
            return;
        }
    }
    
    // If validation passes, remove any error styling
    input.classList.remove('error');
    
    // Remove error message if it exists
    const errorElement = input.parentElement.querySelector('.input-error');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Display error message for an input
 * 
 * @param {HTMLElement} input - Input element with error
 * @param {string} message - Error message to display
 */
function showInputError(input, message) {
    // Add error styling to input
    input.classList.add('error');
    
    // Check if error message already exists
    let errorElement = input.parentElement.querySelector('.input-error');
    
    // If no error element exists, create one
    if (!errorElement) {
        errorElement = document.createElement('p');
        errorElement.className = 'input-error';
        errorElement.style.color = 'var(--error)';
        errorElement.style.fontSize = '1.2rem';
        errorElement.style.marginTop = '0.5rem';
        input.parentElement.appendChild(errorElement);
    }
    
    // Set error message
    errorElement.textContent = message;
}

// Call form validation setup
addFormValidation();
