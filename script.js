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
        const films = document.getElementById('films');
  
        data.forEach(movie => {
          films.insertAdjacentHTML('beforeend', `<li>${movie.title}</li>`)
        });
          // display clicked movie
          films.addEventListener('click', () => {
            // display clicked movie
            fetch(`http://localhost:3000/films/${movie.id}`)
              .then(response => response.json())
              .then(movieData => {
                filmdetails(movieData);
              });
          });
          films.appendChild(listItem);
        });
  
    // Function to display movie details
    function filmdetails(data) {
      document.getElementById('title').innerHTML = data.title;
        document.getElementById('movie-url').src = data.poster;
        document.getElementById('runtime').textContent = `${data.runtime} minutes`;
        document.getElementById('showtime').textContent = data.showtime;
        document.getElementById('description').textContent = data.description;
        document.getElementById('availableTickets').innerHTML = data.capacity-data.tickets_sold;
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

  