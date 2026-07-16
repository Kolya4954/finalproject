import "./js/getEvent"

// const URL = "https://app.ticketmaster.com/discovery/v2/";
// const API_KEY = "hXUd5IDKsavTl95aAOfGkyFDSk68VDlw";

// let keyword = "";
// let country = "";
// let page = 1;

// async function getImg() {
//     const res = await fetch(
//         `https://app.ticketmaster.com/discovery/v2/events?apikey=hXUd5IDKsavTl95aAOfGkyFDSk68VDlw&locale=*`
//     );
//     console.log(res);
    
//     const data = await res.json();
//     return data
// }

// getImg()


const URL = "https://app.ticketmaster.com/discovery/v2/events.json";
const API_KEY = "hXUd5IDKsavTl95aAOfGkyFDSk68VDlw";

async function getEvents() {
  const res = await fetch(
    `${URL}?apikey=${API_KEY}&locale=*`
  );

  const data = await res.json();
  data._embedded.events.forEach(event => {
    console.log(event.name);              // Назва
    console.log(event.images[0].url);     // Зображення
    console.log(event.dates.start.localDate); // Дата
    console.log(event._embedded.venues[0].name); // Місце
});
  console.log(data);
}

getEvents()