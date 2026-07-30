
import debounce from 'debounce';
import 'animate.css';


const listEl = document.querySelector(".main-list");
const keywordInputEl = document.querySelector(".header-input");
const loaderEl = document.querySelector(".loader");
const countryEl = document.querySelector(".header-list")


const URL = "https://app.ticketmaster.com/discovery/v2/events.json";
const API_KEY = "hXUd5IDKsavTl95aAOfGkyFDSk68VDlw";


let keyword = "";
let country = "";
let page = 1;
let isLoading = false


async function getEvents(keyword, page, country) {
    const res = await fetch(
        `${URL}?apikey=${API_KEY}&keyword=${keyword}&page=${page}&countryCode=${country}&locale=*`
    )

    const data = await res.json();

    return data
}


keywordInputEl.addEventListener("input", debounce(async () => {
    keyword = keywordInputEl.value.trim()

    page = 1;

    listEl.innerHTML = "";
    const res = await getEvents(keyword, page, country)
    console.log(res);
    
    render(res._embedded?.events || [])
}, 500)
)

countryEl.addEventListener("change", async () => {
    country = countryEl.value;
    page = 1;
    listEl.innerHTML = "";

    const res = await getEvents(keyword, page, country);
    render(res._embedded?.events || []);
});

function render(arr) {
    const item = arr.map((e) => {
      
    const image = e.images[0]?.url;
    const name =e.name.length > 17? e.name.slice(0, 17) + "...": e.name;
    const date = e.dates.start.localDate;
    const city = e._embedded?.venues[0]?.city?.name || "Unknown";
    return `
        <li class="event-card animate__animated animate__fadeIn animate__slow"
        data-id="${e.id}"
        >
            <img src="${image}" alt="${name}" class="img">

            <h2 class="name">${name}</h2>

            <p class="date">${date}</p>

            <p class="city">${city}</p>
        </li>`
    }).join("");

    listEl.insertAdjacentHTML("beforeend", item);
}

const observer = new IntersectionObserver(async (entries) => {
    const entry = entries[0];

    if (!entry.isIntersecting || isLoading) return;

    isLoading = true;

    page += 1;

    const res = await getEvents(keyword, page, country);
    render(res._embedded?.events || []);

    isLoading = false;
}, {
    rootMargin: "200px"
});

observer.observe(loaderEl);

async function init() {
    page = 1
    const events = await getEvents("", page, country);

    render(events._embedded?.events || []);
}


if (listEl) {
  listEl.addEventListener("click", async (e) => {
    const card = e.target.closest(".event-card");   
    if (!card) return;

     const res = await fetch(
  `https://app.ticketmaster.com/discovery/v2/events/${card.dataset.id}.json?apikey=${API_KEY}`
);


const event = await res.json();



openModal(event);
  });
}

function truncateText(text, maxLength = 100) {
  if (!text) return "no info";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

function getTicketUrl(event) {
  return event.url || event._links?.self?.href || "#";
}

function getPriceText(event) {
  const price = event.priceRanges?.[0];
  if (!price) return "You can look at our Website";
  
  const min = price.min ?? 0;
  const max = price.max ?? min;
  const currency = price.currency || "UAH";
  
  return min === max ? `${min} ${currency}` : `${min}-${max} ${currency}`;
}

function openModal(event) {
  const venue = event._embedded?.venues?.[0];
  const imgUrl = event.images?.[0]?.url || "";
  const authorName = event._embedded?.attractions?.[0]?.name || "Artist";

  const rawInfo = event.info || event.pleaseNote || "Sorry, no info.";
  const formattedInfo = truncateText(rawInfo, 100);

  const ticketUrl = getTicketUrl(event);
  const priceText = getPriceText(event);

  const backdrop = document.createElement("div");
  backdrop.classList.add("backdrop");

  backdrop.innerHTML = `
    <div class="modal">
      <button class="modal-close-btn" type="button">✕</button>
      
      <div class="circle-thumb">
        <img class="circle" src="${imgUrl}" alt="${authorName}">
      </div>

      <div class="in-modal">
        <img class="modal-img" src="${imgUrl}" alt="${authorName}">

        <div class="modal-text">
          <h2 class="modal-h2">INFO</h2>
          <p class="main-modal-text">${formattedInfo}</p>

          <h2 class="modal-h2">WHEN</h2>
          <p class="main-modal-text">${event.dates?.start?.localDate || "TBA"}<br>${event.dates?.start?.localTime || ""} (${event.dates?.timezone || ""})</p>

          <h2 class="modal-h2">WHERE</h2>
          <p class="main-modal-text">${venue?.city?.name || ""}, ${venue?.country?.name || ""}<br>${venue?.name || ""}</p>

          <h2 class="modal-h2">WHO</h2>
          <p class="main-modal-text">${authorName}</p>

          <h2 class="modal-h2">PRICES</h2>
          <p class="main-modal-text">${priceText}</p>

          <a class="modal-button modal-tickets" href="${ticketUrl}" target="_blank" rel="noopener noreferrer">BUY TICKETS</a>
        </div>
      </div>

      <button class="modal-Author" type="button">MORE FROM THIS AUTHOR</button>
    </div>
  `
  
  function handleEsc(e) {
  if (e.key === "Escape") {
    closeModal();
  }
}

const closeModal = () => {
  document.removeEventListener("keydown", handleEsc);
  backdrop.remove();
};

backdrop.querySelector(".modal-close-btn").onclick = closeModal;

backdrop.onclick = (e) => {
  if (e.target === backdrop) {
    closeModal();
  }
};

document.addEventListener("keydown", handleEsc);

document.body.appendChild(backdrop);
  ;
}




document.addEventListener("keydown", handleEsc);