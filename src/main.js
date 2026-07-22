import "./js/getEvent"
import debounce from 'debounce';

const listEl = document.querySelector(".main-list");
const keywordInputEl = document.querySelector(".header-input");
const loaderEl = document.querySelector(".loader");

const URL = "https://app.ticketmaster.com/discovery/v2/events.json";
const API_KEY = "hXUd5IDKsavTl95aAOfGkyFDSk68VDlw";

let keyword = "";
let country = "";
let page = 1;
let isLoading = false

async function getEvents(keyword, page) {
    const res = await fetch(
        `${URL}?apikey=${API_KEY}&keyword=${keyword}&page=${page}`
    )
    
    const data = await res.json();
  
    
    return data
}



keywordInputEl.addEventListener("input", debounce(async () => {
    keyword = keywordInputEl.value.trim()

    page = 1;

    listEl.innerHTML = "";
    const res = await getEvents(keyword, page)

    render(res._embedded?.events || [])
}, 500)
)


function render(arr) {
    const item = arr.map((e) => {
      
    const image = e.images[0]?.url;
    const name =e.name.length > 17? e.name.slice(0, 17) + "...": e.name;
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

    listEl.insertAdjacentHTML("beforeend", item);
}

// const observer = new IntersectionObserver((entry) => {
//     entry.forEach(async (e) => {
//         if (e.isIntersecting && keyword !== "") {
//             page += 1
//             const res = await getEvents(keyword, page)
//             render(res)
//             console.log(page);
            
//         }
//     })
// }, {
//     rootMargin: "200px"
// })
// observer.observe(loaderEl)

const observer = new IntersectionObserver(async (entries) => {
    const entry = entries[0];

    if (!entry.isIntersecting || isLoading) return;

    isLoading = true;

    page += 1;

    const res = await getEvents(keyword, page);
    render(res._embedded?.events || []);

    isLoading = false;
}, {
    rootMargin: "200px"
});

observer.observe(loaderEl);

async function init() {
    page = 1
    const events = await getEvents("", page);

    render(events._embedded?.events || []);
}

init()