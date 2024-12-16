document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const consentCheckbox = document.getElementById("consentCheckbox");
    const consentError = document.getElementById("consentError");

    form.addEventListener("submit", function (e) {
            e.preventDefault();
            let valid = true;
        

        // Remove all existing error messages 
        form.querySelectorAll(".error-message").forEach(el => el.style.display= "none");

        // Check each required input 
        form.querySelectorAll("[required]").forEach(input => {
            if (!input.value) {
                showError(input, "This field is required");
                valid = false;
            } else if (input.type === "text" && !validateName(input.value)) {
                showError(input, "Enter a valid name");
                valid = false
            } else if (input.type === "email" && !validateEmail(input.value)) {
                showError(input, "Enter a valid email address");
                valid = false;
            } else {
                clearError(input);
            }
        });

        // Check the consent checkbox 
        if (!consentCheckbox.checked) {
            consentError.style.display = "block"
            consentError.innerText = "To submit this form, please consent to being contacted";
            valid = false;
        } else {
            consentError.style.display = "none";
        }

        if (valid) {
            showSuccess();
            form.reset();
        }
    });

    function showError(input, message) {
        const error = document.createElement("div"); 
        error.className = "error-message"; 
        error.innerText = message; 
        input.parentElement.appendChild(error); 
        input.classList.add("error"); 
        input.setAttribute("aria-invalid", "true");
    }
    

    function clearError(input) {
        const error = input.parentElement.querySelector(".error-message"); 
        if (error) { 
            error.remove(); 
        } 
        input.classList.remove("error"); 
        input.removeAttribute("aria-invalid");
    }


    function showSuccess() {
        const successMessage = document.createElement("div");
        successMessage.className = "success-toast";
        successMessage.innerHTML = `
          <div class="icon-and-message"> 
          <img class="success-icon" src="assets/images/icon-success-check.svg"> 
          <div class="success-text"> 
          <strong>Message Sent!</strong><br> 
          </div> 
          </div> <div class="toast-message">Thanks for completing the form. We"ll be in touch soon!</div> 
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