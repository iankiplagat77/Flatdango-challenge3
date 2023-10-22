const film = document.querySelector('p')
const list = document.querySelector('ul')

fetch("./db.json")
    .then(res => res.json())
    .then(data => {
        Object.entries(data).forEach(movies => {
            //console.log(movies[1][0].title)
            film.insertAdjacentHTML('beforeend', `
            <p><b>Title</b>: ${movies[1][0].title}</p>
            <p><b>Runtime</b>: ${movies[1][0].runtime}</p>
            <p><b>Showtime</b>: ${movies[1][0].showtime}</p>
            <p><b>Description</b>: ${movies[1][0].description}</p>
            <p><b>Available Tickets</b>: <span id="tickets">${movies[1][0].capacity - movies[1][0].tickets_sold}</span></p>
            
            <img src="${movies[1][0].poster}">
            
            `)
        })

        Object.entries(data).forEach(movies => {
            moviearr = movies[1]
            Object.entries(moviearr).forEach(movie => {
                console.log(movie[1].title)
                list.insertAdjacentHTML('beforeend', `<li>${movie[1].title}</li>`)

            })
        })
    })


function buyTickets(){
    const tickets_available = document.getElementById('tickets')
    const tickets = tickets_available.innerHTML
    if(tickets > 0){
        alert("Successfully Bought Ticket")
        tickets_new = tickets - 1
        tickets_available.innerHTML = tickets_new
    }else{
        alert("Tickets Sold Out")
    }
}


