
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const consentCheckbox = document.getElementById("consentCheckbox");
    const consentError = document.getElementById("consentError");
    const messageField = document.getElementById('message');
    const messageError = document.getElementById('messageError');

    // Create error message element for query type
    const queryTypeError = document.createElement('div');
    queryTypeError.className = 'error-message query-type-error';
    queryTypeError.style.display = 'none'; // Hide initially
    document.querySelector('.equiry-and-request').appendChild(queryTypeError); // Append to parent element

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let valid = true;

        console.log("Form submitted");

        // Remove all existing error messages
        form.querySelectorAll(".error-message").forEach(el => el.style.display = "none");

        // Form field references
        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const email = document.getElementById("email");
        const queryType = form.querySelector('input[name="queryType"]:checked');
        const message = messageField.value;

        // Validate first name
        if (!validateName(firstName.value)) {
            showError(firstName, 'This field is required');
            valid = false;
        } else {
            clearError(firstName);
        }

        // Validate last name
        if (!validateName(lastName.value)) {
            showError(lastName, 'This field is required');
            valid = false;
        } else {
            clearError(lastName);
        }

        // Validate email
        if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            valid = false;
        } else {
            clearError(email);
        }

        // Validate query type
        if (!queryType) {
            queryTypeError.innerText = 'Please select a query type';
            queryTypeError.style.display = 'block';
            valid = false;
        } else {
            queryTypeError.style.display = 'none';
        }

        // Validate message
        if (!message.trim()) {
            messageError.style.display = "block";
            messageError.innerText = "This field is required";
            valid = false;
        } else {
            messageError.style.display = "none";
        }

        // Check the consent checkbox
        if (!consentCheckbox.checked) {
            consentError.style.display = "block";
            consentError.innerText = "To submit this form, please consent to being contacted";
            valid = false;
        } else {
            consentError.style.display = "none";
        }

        if (valid) {
            console.log("Form is valid");
            showSuccess();
            form.reset();
        }
    });

    function showError(input, message) {
        const error = input.nextElementSibling;
        if (!error || !error.classList.contains('error-message')) {
            const newError = document.createElement('div');
            newError.className = 'error-message';
            newError.innerText = message;
            input.parentElement.appendChild(newError);
        } else {
            error.innerText = message;
            error.style.display = 'block';
        }
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
    }

    function clearError(input) {
        const error = input.nextElementSibling;
        if (error && error.classList.contains('error-message')) {
            error.style.display = 'none';
        }
        input.classList.remove('error');
        input.removeAttribute('aria-invalid');
    }

    function showSuccess() {
        console.log("Showing success message");
        const successMessage = document.createElement("div");
        successMessage.className = "success-toast";
        successMessage.innerHTML = `
            <div class="icon-and-message">
                <img class="success-icon" src="assets/images/icon-success-check.svg">
                <div class="success-text">
                    <strong>Message Sent!</strong><br>
                </div>
            </div>
            <div class="toast-message">Thanks for completing the form. We'll be in touch soon!</div>
        `;
        document.body.appendChild(successMessage);
        setTimeout(() => {
            successMessage.remove();
        }, 3000);  
    }

    function validateEmail(email) {
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        return emailPattern.test(email);
    }

    function validateName(name) {
        const namePattern = /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/;
        return name.length >= 2 && namePattern.test(name);
    }

    // Add background color to selected radio button
    const options = document.querySelectorAll('input[name="queryType"]');

    options.forEach(option => {
        option.addEventListener("change", function () {
            options.forEach(opt => {
                if (opt.checked) {
                    opt.parentElement.style.backgroundColor = "hsl(148, 38%, 91%)";
                } else {
                    opt.parentElement.style.backgroundColor = "";
                } 
            });
            
        });
            
    });
            
});