document.addEventListener("DOMContentLoaded", () => {
    //contacts server upon loading
    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(data => {
      //get the details for the first movie on the list
       data=data[0]
       //display the details of the gotten movie
        document.getElementById('title').innerHTML = data.title;
        document.getElementById('movie-url').src = data.poster;
        document.getElementById('runtime').textContent = `${data.runtime} minutes`;
        document.getElementById('showtime').textContent = data.showtime;
        document.getElementById('description').textContent = data.description;
        document.getElementById('availableTickets').innerHTML = data.capacity-data.tickets_sold;
      });
  
    //get the other films to display as list
    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(data => {
        const filmsList = document.getElementById('films');
        const placeholder = filmsList.querySelector('.placeholder');
        if (placeholder) {
          filmsList.removeChild(placeholder);
        }
  
        data.forEach(movie => {
          const listItem = document.createElement('li');
          listItem.classList.add('film', 'item');
          listItem.textContent = movie.title;
          listItem.addEventListener('click', () => {
            // When a movie is clicked, fetch its details and display them
            fetch(`http://localhost:3000/films/${movie.id}`)
              .then(response => response.json())
              .then(movieData => {
                displayMovieDetails(movieData);
              });
          });
          filmsList.appendChild(listItem);
        });
      });
  
    // Function to display movie details
    function displayMovieDetails(data) {
      const poster = data.poster;
      const title = data.title;
      const runtime = data.runtime;
      const showtime = data.showtime;
      const description = data.description;
      const capacity = data.capacity;
      const ticketsSold = data.tickets_sold;
      const availableTickets = capacity - ticketsSold;
  
      document.getElementById('poster').src = poster;
      document.getElementById('movieTitle').textContent = title;
      document.getElementById('runtime').textContent = `Runtime: ${runtime} minutes`;
      document.getElementById('showtime').textContent = `Showtime: ${showtime}`;
      document.getElementById('description').textContent = `Description: ${description}`;
      document.getElementById('availableTickets').innerHTML = `${availableTickets}`;
    }
  });
  function purchase(){
    let available_tickets = document.getElementById('availableTickets').innerHTML;
    if (available_tickets > 0){
        available_tickets -=1;
        alert(`You have Successfully Purchased a Ticket ${document.getElementById('title').innerHTML}`)
        document.getElementById("availableTickets").innerHTML=available_tickets;
    }else{
        alert("No Available Tickets")
    }
  }

  