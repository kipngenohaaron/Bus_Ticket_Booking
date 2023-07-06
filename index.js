// Function to handle signup
function handleSignup(event) {
    event.preventDefault();

    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    // Create a new user object
    const newUser = {
      name: name,
      email: email,
      password: password
    };

    // Make a POST request to the signup API endpoint
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(response => {
        if (response.ok) {
          // Show a success message or navigate to the next page
          alert('Sign up successful! Please log in.');

          // Clear the signup form fields
          nameInput.value = '';
          emailInput.value = '';
          passwordInput.value = '';
        } else {
          // Show an error message
          alert('Sign up failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // Function to handle login
  function handleLogin(event) {
    event.preventDefault();

    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');

    const email = emailInput.value;
    const password = passwordInput.value;

    // Create a login object
    const loginData = {
      email: email,
      password: password
    };

    // Make a POST request to the login API endpoint
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then(response => {
        if (response.ok) {
          // Show a success message and redirect to the next page
          alert('Login successful! Redirecting to the next page...');
          window.location.replace('dashboard.html');
        } else {
          // Show an error message
          alert('Invalid email or password. Please try again.');

          // Clear the login form fields
          emailInput.value = '';
          passwordInput.value = '';
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // Function to fetch doctors data
  function fetchDoctors() {
    // Make a GET request to the doctors API endpoint
    fetch('http://localhost:3000/doctors')
      .then(response => response.json())
      .then(doctors => {
        // Process the doctors data
        console.log('Doctors:', doctors);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // Attach event listeners to the signup and login forms
  const signupForm = document.querySelector('.signup');
  signupForm.addEventListener('submit', handleSignup);

  const loginForm = document.querySelector('.login');
  loginForm.addEventListener('submit', handleLogin);

  // Fetch doctors data
  fetchDoctors();
  

