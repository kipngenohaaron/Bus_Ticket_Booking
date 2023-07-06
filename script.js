// document.addEventListener("DOMContentLoaded", function() {
//     // Get DOM elements
//     const busRouteSelect = document.getElementById("bus-route");
//     const nameInput = document.getElementById("name");
//     const emailInput = document.getElementById("email");
//     const phoneInput = document.getElementById("phone");
//     const numTicketsInput = document.getElementById("num-tickets");
//     const seatNumberInput = document.getElementById("seat-number");
//     const bookTicketBtn = document.getElementById("book-ticket-btn");

//     // Fetch available bus routes from the server
//     fetch("/routes")
//         .then(response => response.json())
//         .then(routes => {
//             // Populate bus route select options
//             routes.forEach(route => {
//                 const option = document.createElement("option");
//                 option.value = route.id;
//                 option.textContent = route.name;
//                 busRouteSelect.appendChild(option);
//             });
//         })
//         .catch(error => console.error(error));

//     // Event listener for booking ticket button
//     bookTicketBtn.addEventListener("click", function() {
//         // Get form input values
//         const routeId = busRouteSelect.value;
//         const name = nameInput.value;
//         const email = emailInput.value;
//         const phone = phoneInput.value;
//         const numTickets = numTicketsInput.value;
//         const seatNumber = seatNumberInput.value;

//         // Validate form inputs

//         // Submit ticket booking request to the server

//         // Process the response and display success or error message
//     });
// });

document.addEventListener("DOMContentLoaded", function() {
    // Get DOM elements
    const busRouteSelect = document.getElementById("bus-route");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const numTicketsInput = document.getElementById("num-tickets");
    const seatNumberInput = document.getElementById("seat-number");
    const bookTicketBtn = document.getElementById("book-ticket-btn");
    const messageDiv = document.getElementById("message");

    // Fetch available bus routes from the API endpoint
    fetch("http://localhost:3000/Routes") // Replace "/api/routes" with your API endpoint URL
        .then(response => response.json())
        .then(routes => {
            // Populate bus route select options
            routes.forEach(route => {
                const option = document.createElement("option");
                option.value = route.id;
                option.textContent = route.name;
                busRouteSelect.appendChild(option);
            });
        })
        .catch(error => console.error(error));

    // Handle form submission
    bookTicketBtn.addEventListener("click", function(event) {
        event.preventDefault();

        // Collect form data
        const formData = {
            routeId: busRouteSelect.value,
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            numTickets: numTicketsInput.value,
            seatNumber: seatNumberInput.value
        };

        // Send form data to the API endpoint for ticket booking
        fetch("/api/book-ticket", { // Replace "/api/book-ticket" with your API endpoint URL
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                // Display booking status message
                messageDiv.textContent = data.message;
                messageDiv.classList.remove("hidden");
            })
            .catch(error => console.error(error));
    });
});
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
  