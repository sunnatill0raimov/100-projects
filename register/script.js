const registerForm = document.getElementById("registerForm");
const inputs = registerForm.querySelectorAll("input");

registerForm.addEventListener("submit", registerData);

function registerData(e) {
  e.preventDefault();

  const registerObject = {};
  const formData = new FormData(registerForm);

  formData.forEach((value, key) => {
    registerObject[key] = value.trim();
  });

  checkRegister(registerObject);
}

function showError(input, message) {
  input.style.borderColor = "#ef4c4cff";
  const small = input.nextElementSibling; // inputdan keyingi <small>
  if (small && small.tagName === "SMALL") small.textContent = message;
}

function showSuccess(input) {
  input.style.borderColor = "#4cef57ff";
  const small = input.nextElementSibling;
  if (small && small.tagName === "SMALL") small.textContent = "";
}

function checkRegister(register) {
  const { username, email, password, confirm } = register;

  const usernameEl = registerForm.elements["username"];
  const emailEl = registerForm.elements["email"];
  const passwordEl = registerForm.elements["password"];
  const confirmEl = registerForm.elements["confirm"];

  // 1) Bo'sh tekshirish
  if (!username) showError(usernameEl, "Username bo‘sh bo‘lmasin");
	else if (username.length < 3) showError(usernameEl, "Username kamida 3 belgidan ko'p bo'lish kerak")
  else showSuccess(usernameEl);

  if (!email) showError(emailEl, "Email bo‘sh bo‘lmasin");
  else if (!isValidEmail(email)) showError(emailEl, "Email noto‘g‘ri formatda");
  else showSuccess(emailEl);

  if (!password) showError(passwordEl, "Password bo‘sh bo‘lmasin");
  else if (password.length < 6) showError(passwordEl, "Kamida 6 ta belgidan iborat bo‘lsin");
  else showSuccess(passwordEl);

  if (!confirm) showError(confirmEl, "Confirm password bo‘sh bo‘lmasin");
  else if (password !== confirm) showError(confirmEl, "Parollar mos emas");
  else showSuccess(confirmEl);
}

function isValidEmail(email) {
  // oddiy, yetarli regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
