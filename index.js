const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("password2");
const email = document.getElementById("email");

const form = document.getElementById("form");

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(input) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (validRegex.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "email is not valid");
  }
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function getFieldName(input) {
  console.log(input);
  const res = input.id.charAt(0).toUpperCase() + input.id.slice(1);
  return res;
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be atleast ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkRequired(...input) {
  console.log(input);

  input.forEach((item) => {
    if (item.value === "") {
      showError(item, `${getFieldName(item)} required`);
    } else {
      showSuccess(item);
    }
  });
}

function checkPasswordsMatch(str1, str2) {
  if (str1.value !== str2.value) {
    showError(str2, "passwords doesnt match");
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired(username, password, confirmPassword, email);
  checkLength(username, 3, 14);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, confirmPassword);
});
