document.addEventListener('DOMContentLoaded', function () { 
    const form = document.getElementById('contactForm'); 

    form.addEventListener('submit', function (e) { 
        e.preventDefault(); 
        let valid = true; 

        // Remove existing success message (if any) 
        const existingSuccessMessage = document.querySelector('.success-toast'); 
        if (existingSuccessMessage) { 
            existingSuccessMessage.remove(); 
        }
        
        // Check each required input 
         form.querySelectorAll('[required]').forEach(input => { 
            if (!input.value) { 
                showError(input, 'This field is required'); 
                valid = false; 
            } else { 
                clearError(input); 
            } 
        }); 
        
        // Check email format 
        const email = form.querySelector('#email'); 
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; 
        if (!emailPattern.test(email.value)) { 
            showError(email, 'Enter a valid email address'); 
            valid = false; 
        } else { 
            clearError(email); 
        }
        
        if (valid) { 
            showSuccess(); 
        } 
    }); 
    
    function showError(input, message) { 
        const error = document.createElement('div'); 
        error.className = 'error-message'; 
        error.innerText = message; 
        input.parentElement.appendChild(error); 
        input.setAttribute('aria-invalid', 'true'); 
        input.setAttribute('aria-describedby', 'error-' + input.id); 
        input.focus(); 
    } 
    
    function clearError(input) { 
        const error = input.parentElement.querySelector('.error-message'); 
        if (error) { 
            error.remove(); 
        } 
        input.removeAttribute('aria-invalid'); 
        input.removeAttribute('aria-describedby'); 
    } 
    
    function showSuccess() { 
        const successMessage = document.createElement('div'); 
        successMessage.className = 'success-toast'; 
        successMessage.innerText = 'Message sent ✅! Thanks for completing the form. We will be in touch soon!'; 
        document.body.appendChild(successMessage); 
        setTimeout(() => { 
            successMessage.remove();
        }, 3000);
    }
});