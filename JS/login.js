const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
const loginError = document.getElementById('loginError');
const signupMessage = document.getElementById('signupMessage');
const welcomeMessage = document.getElementById('welcomeMessage');

// localStorage.clear() 

// Regex for email validation (not allowing gmail.com)
const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/;
// Simple regex for password validation (at least 6 characters)
const passwordRegex = /^.{6,}$/;

// Function to hide all messages
function hideAllMessages() {
  loginError.style.display = 'none';
  signupMessage.style.display = 'none';
  welcomeMessage.style.display = 'none';
}

signupBtn.onclick = (() => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});

loginBtn.onclick = (() => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});

signupLink.onclick = (() => {
  signupBtn.click();
  return false;
});

// Initialize the array of users
let users = JSON.parse(localStorage.getItem('users')) || [];

// Sample doctors with predefined email and password
const doctors = [
    { email: 'doctor1@gmail.com', password: 'password123', name: 'Dr. Ahmed' },
  { email: 'doctor2@gmail.com', password: 'password456', name: 'Dr. Fatma' },
  { email: 'doctor3@gmail.com', password: 'password789', name: 'Dr. Ali' },
  { email: 'doctor4@gmail.com', password: 'password159', name: 'Dr. Ahmed' }
];

// Handle signup form submission
document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const signupEmail = document.getElementById('signupEmail').value;
  const signupPassword = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Check if the email already exists
  const existingUser = users.find(u => u.email === signupEmail);
  if (existingUser) {
    hideAllMessages(); // Hide any existing messages
    signupMessage.textContent = 'This email is already registered!';
    signupMessage.style.color = 'red';
    signupMessage.style.display = 'block'; // Show error message

    // Hide the error message after 60 seconds
    setTimeout(() => {
      signupMessage.style.display = 'none';
    }, 60000); // 60 seconds
    return; // Exit the function if the email exists
  }

  // Validate email and password
  if (!emailRegex.test(signupEmail)) {
    hideAllMessages(); // Hide any existing messages
    signupMessage.textContent = 'Invalid email format or gmail.com is not allowed.';
    signupMessage.style.color = 'red';
    signupMessage.style.display = 'block'; // Show error message
    setTimeout(() => {
      signupMessage.style.display = 'none';
    }, 60000); // 60 seconds
    return;
  }

  if (!passwordRegex.test(signupPassword)) {
    hideAllMessages(); // Hide any existing messages
    signupMessage.textContent = 'Password must be at least 6 characters long.';
    signupMessage.style.color = 'red';
    signupMessage.style.display = 'block'; // Show error message
    setTimeout(() => {
      signupMessage.style.display = 'none';
    }, 60000); // 60 seconds
    return;
  }

  if (signupPassword === confirmPassword) {
    // Create a user object
    const user = {
      email: signupEmail,
      password: signupPassword
    };

    // Add user to the array and update localStorage
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Display a success message
    hideAllMessages(); // Hide any existing messages
    signupMessage.textContent = 'Signup successful! You can now login.';
    signupMessage.style.color = 'green';
    signupMessage.style.display = 'block';  // Show the message
    document.getElementById('signup-form').reset();
    loginBtn.click(); // Switch to login form

    // Hide the message after 60 seconds
    setTimeout(() => {
      signupMessage.style.display = 'none';
    }, 60000); // 60 seconds
  } else {
    hideAllMessages(); // Hide any existing messages
    signupMessage.textContent = 'Passwords do not match!';
    signupMessage.style.color = 'red';
    signupMessage.style.display = 'block'; // Show error message

    // Hide the error message after 60 seconds
    setTimeout(() => {
      signupMessage.style.display = 'none';
    }, 600); 
  }
});

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const loginEmail = document.getElementById('loginEmail').value;
  const loginPassword = document.getElementById('loginPassword').value;

  // Check if the email and password match the predefined doctors
  const doctor = doctors.find(doc => doc.email === loginEmail && doc.password === loginPassword);

  // Check if the user exists in the localStorage
  const user = users.find(u => u.email === loginEmail && u.password === loginPassword);

  if (doctor) {
    // Successful login for doctors
    hideAllMessages(); // Hide any existing messages
    welcomeMessage.textContent = `Welcome, Dr. ${doctor.name}!`;
    welcomeMessage.style.color = 'green';
    loginError.style.display = 'none';
    welcomeMessage.style.display = 'block'; // Show welcome message

    // Hide welcome message after 60 seconds
    setTimeout(() => {
      welcomeMessage.style.display = 'none';
    }, 6000);

    window.location.href = './Page/AppointmentShow.html'; // Redirect to the appointment page
  } else if (user) {
    // Successful login for registered users
    hideAllMessages(); // Hide any existing messages
    welcomeMessage.textContent = `Welcome, ${user.email}!`;
    welcomeMessage.style.color = 'green';
    welcomeMessage.style.display = 'block'; // Show welcome message
    loginError.style.display = 'none';

    // Hide welcome message after 60 seconds
    setTimeout(() => {
      welcomeMessage.style.display = 'none';
      window.location.href = './Page/Home.html'; // Redirect to the hospital page
    }, 300);

  } else {
    // Show error message
    hideAllMessages(); // Hide any existing messages
    loginError.style.display = 'block'; // Show error message
    loginError.textContent = 'Sorry, this account does not exist.';

    // Hide error message after 60 seconds
    setTimeout(() => {
      loginError.style.display = 'none';
    }, 6000);
  }
});
