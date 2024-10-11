const form = document.querySelector(".form");
const cardName = document.querySelector(".form-name");
const cardNumber = document.querySelector(".form-number");
const cardMonth = document.querySelector(".form-month");
const cardYear = document.querySelector(".form-year");
const cardCvc = document.querySelector(".form-cvc");
const btn = document.querySelector(".form-btn");

const cardFrontNumber = document.querySelector(".card-front-number");
const cardFrontName = document.querySelector(".card-front-name");
const cardFrontMonth = document.querySelector(".card-month");
const cardFrontYear = document.querySelector(".card-year");
const cardBackCvc = document.querySelector(".card-back-cvc");

let lettersOnly = /^[A-Za-z\s]+$/; // Allow letters and spaces for names
let numbersOnly = /^[0-9]+$/; // Only numbers
let invalid = false;

// Function to format the card number with spaces every 4 digits
function formatCardNumber(inputElement) {
  let value = inputElement.value.replace(/\s+/g, "").replace(/[^0-9]/g, "");
  let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value;
  inputElement.value = formattedValue;
}

// Event listener for input formatting
cardNumber.addEventListener("input", function () {
  formatCardNumber(cardNumber);
});

// Function to show error messages
function showErrorMessage(selector) {
  document.querySelector(selector).classList.remove("hidden");
}

btn.addEventListener("click", function (e) {
  e.preventDefault();
  invalid = false;

  // Check if the name contains only letters and spaces
  if (lettersOnly.test(cardName.value)) {
    cardFrontName.textContent = cardName.value; // Update front card name
  } else {
    invalid = true;
    showErrorMessage(".form-invalid-name");
  }

  // Check if the card number contains only numbers
  if (numbersOnly.test(cardNumber.value.replace(/\s+/g, ""))) {
    cardFrontNumber.textContent = cardNumber.value
      .replace(/\s+/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 "); // Format with spaces
  } else {
    invalid = true;
    showErrorMessage(".form-invalid-number");
  }

  if (
    numbersOnly.test(cardMonth.value) &&
    parseInt(cardMonth.value) >= 1 &&
    parseInt(cardMonth.value) <= 12
  ) {
    cardFrontMonth.textContent = cardMonth.value;
  } else {
    invalid = true;
    showErrorMessage(".form-invalid-date");
  }

  const currentYear = new Date().getFullYear() % 100;
  if (numbersOnly.test(cardYear.value) && parseInt(cardYear.value) >= currentYear) {
    cardFrontYear.textContent = cardYear.value;
  } else {
    invalid = true;
    showErrorMessage(".form-invalid-date");
  }

  // Check if the CVC contains only numbers
  if (numbersOnly.test(cardCvc.value)) {
    cardBackCvc.textContent = cardCvc.value;
  } else {
    invalid = true;
    showErrorMessage(".form-invalid-cvc");
  }

  // If all validations pass
  if (!invalid) {
    // Success! Handle form submission or display confirmation.
    form.style.display = "none";
    document.querySelector(".none").classList.remove("none");
  }
});
