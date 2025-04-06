// Wait for the DOM to be fully loaded before executing
document.addEventListener("DOMContentLoaded", () => {
  // Get the form element and input fields
  const joinForm = document.querySelector("#join-form form");
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const countryInput = document.getElementById("country");

  // Function to create and show popup
  function showPopup(type, title, message) {
    // Create a custom popup element
    const popup = document.createElement("div");
    popup.className = `popup ${type}`;

    const icon = type === "success" ? "✓" : "✕";

    popup.innerHTML = `
        <div class="popup-content">
          <div class="popup-icon">${icon}</div>
          <h3>${title}</h3>
          <p>${message}</p>
          <button class="close-btn">Close</button>
        </div>
      `;

    // Add the popup to the body
    document.body.appendChild(popup);

    // Trigger animation (slight delay for better effect)
    setTimeout(() => {
      popup.classList.add("show-popup");
    }, 10);

    // Add click event to close button
    const closeButton = popup.querySelector(".close-btn");
    closeButton.addEventListener("click", () => {
      popup.classList.remove("show-popup");

      // Remove the popup after transition
      setTimeout(() => {
        document.body.removeChild(popup);
      }, 300);

      // Reset the form if it was a success message
      if (type === "success") {
        joinForm.reset();
      }
    });

    // Allow clicking outside to close
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        closeButton.click();
      }
    });
  }

  // Function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to validate the form
  function validateForm() {
    let isValid = true;

    // Reset all error states
    const inputs = [fullNameInput, emailInput, countryInput];
    inputs.forEach((input) => {
      input.classList.remove("input-error");
      document.getElementById(`${input.id}Error`).style.display = "none";
    });

    // Validate Full Name
    if (!fullNameInput.value.trim()) {
      fullNameInput.classList.add("input-error");
      document.getElementById("fullNameError").style.display = "block";
      isValid = false;
    }

    // Validate Email
    if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
      emailInput.classList.add("input-error");
      document.getElementById("emailError").style.display = "block";
      isValid = false;
    }

    // Validate Country
    if (!countryInput.value.trim()) {
      countryInput.classList.add("input-error");
      document.getElementById("countryError").style.display = "block";
      isValid = false;
    }

    return isValid;
  }

  // Add submit event listener to the form
  joinForm.addEventListener("submit", function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Validate the form
    if (validateForm()) {
      // Show success popup if validation passes
      showPopup("success", "Congratulations!", "You have successfully joined.");
    } else {
      // Show error popup if validation fails
      showPopup(
        "error",
        "Form Incomplete",
        "Please fill out all required fields correctly."
      );
    }
  });
});
