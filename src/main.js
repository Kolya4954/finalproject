import "./js/getEvent"
import debounce from 'debounce';

const listEl = document.querySelector(".main-list")
const keywordInputEl = document.querySelector(".header-input")

const URL = "https://app.ticketmaster.com/discovery/v2/events.json";
const API_KEY = "hXUd5IDKsavTl95aAOfGkyFDSk68VDlw";

let keyword = "";
let country = "";
let page = 1;

async function getEvents(keyword, page) {
    const res = await fetch(
        `${URL}?apikey=${API_KEY}&keyword=${keyword}&page=${page}`
    )
    
    const data = await res.json();
  
    
    return data._embedded?.events || []
}



keywordInputEl.addEventListener("input", debounce(async () => {
    const keyword = keywordInputEl.value.trim()

    const res = await getEvents(keyword, page)

    render(res)
}, 500)
)


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

