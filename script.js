document.addEventListener("DOMContentLoaded", function() {
  const filmsList = document.getElementById("films");
  const busPoster = document.getElementById("bus-poster");
  const bustitle = document.getElementById("bus-title");
  const movieRuntime = document.getElementById("bus-runtime");
  const movieShowtime = document.getElementById("bus-showtime");
  const busTickets = document.getElementById("bus-tickets");
  const bookTicketBtn = document.getElementById("book-ticket-btn");

  // Fetch films data
  fetch("http://localhost:3000/buses")
    .then(response => response.json())
    .then(buses => {
      // Populate buses list
      buses.forEach(film => {
        const li = document.createElement("li");
        // li.className = "bus-item";
        li.textContent = film.title;
        li.addEventListener("click", () => showMovieDetails(film));
        filmsList.appendChild(li);
      });

      // Show details
      fetchFilmDetails(1);
    })
    .catch(error => console.error(error));

  function fetchFilmDetails(filmId) {
    // Fetch bus details
    fetch(`/buses/${busId}`)
      .then(response => response.json())
      .then(film => showMovieDetails(film))
      .catch(error => console.error(error));
  }

  function showMovieDetails(film) {
    busPoster.style.backgroundImage = `url(${film.poster})`;
    bustitle.textContent = film.title;
    movieRuntime.textContent = `Speed: ${film.runtime} Km/hr`;
    movieShowtime.textContent = `Start-Time: ${film.showtime}`;
    busTickets.textContent = `Tickets available: ${film.capacity - film.tickets_sold}`;

    bookTicketBtn.disabled = film.tickets_sold >= film.capacity;
    bookTicketBtn.textContent = film.tickets_sold >= film.capacity ? "TICKETS OVER TRY OTHER!!" : "BOOK TICKET";
    bookTicketBtn.addEventListener("click", () => bookTicket(film));
  }

  function bookTicket(film) {
    if (film.tickets_sold < film.capacity) {
      film.tickets_sold++;
      busTickets.textContent = `Tickets available: ${film.capacity - film.tickets_sold}`;
      bookTicketBtn.disabled = film.tickets_sold >= film.capacity;
      bookTicketBtn.textContent = film.tickets_sold >= film.capacity ? "TICKETS OVER TRY OTHER!!" : "BOOK TICKET";
    }
  }
});
