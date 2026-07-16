import "./js/getEvent"

import "./js/getEvent"

const listEl = document.querySelector(".list")

const URL = "https://app.ticketmaster.com/discovery/v2/events.json";
const API_KEY = "hXUd5IDKsavTl95aAOfGkyFDSk68VDlw";

let keyword = "";
let country = "";
let page = 1;

async function getEvents() {
    const res = await fetch(
        `${URL}?apikey=${API_KEY}&locale=*`
    )
    
    const data = await res.json();
  
    
    return data._embedded?.events || []
}

getEvents()


function render(arr) {
    const item = arr.map((e) => {
      
    const image = e.images[0]?.url;
    const name = e.name;
    const date = e.dates.start.localDate;
    const city = e._embedded?.venues[0]?.city?.name || "Unknown";
    return `
        <li class="event-card">

            <img src="${image}" alt="${name}" class="img">

            <h2 class="name">${name}</h2>

            <p class="date">${date}</p>

            <p class="city">${city}</p>

        </li>`
    }).join("");

    listEl.innerHTML = item;
}

async function init() {
    const events = await getEvents();

    render(events);
}

init()