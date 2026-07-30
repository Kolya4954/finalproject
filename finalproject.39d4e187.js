let e=document.querySelector(".main-list"),t=document.querySelector(".header-input"),a=document.querySelector(".loader"),n=document.querySelector(".header-list"),o="hXUd5IDKsavTl95aAOfGkyFDSk68VDlw",i="",r="",s=1,l=!1;async function c(e,t,a){let n=await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${o}&keyword=${e}&page=${t}&countryCode=${a}&locale=*`);return await n.json()}function d(t){let a=t.map(e=>{let t=e.images[0]?.url,a=e.name.length>17?e.name.slice(0,17)+"...":e.name,n=e.dates.start.localDate,o=e._embedded?.venues[0]?.city?.name||"Unknown";return`
        <li class="event-card animate__animated animate__fadeIn animate__slow"
        data-id="${e.id}"
        >
            <img src="${t}" alt="${a}" class="img">

            <h2 class="name">${a}</h2>

            <p class="date">${n}</p>

            <p class="city">${o}</p>
        </li>`}).join("");e.insertAdjacentHTML("beforeend",a)}t.addEventListener("input",function(e,t=100,a={}){let n,o,i,r;if("function"!=typeof e)throw TypeError(`Expected the first parameter to be a function, got \`${typeof e}\`.`);if(t<0)throw RangeError("`wait` must not be negative.");if("boolean"==typeof a)throw TypeError("The `options` parameter must be an object, not a boolean. Use `{immediate: true}` instead.");let{immediate:s}=a;function l(){let t=n,a=o;return n=void 0,o=void 0,e.apply(t,a)}function c(){let e=Date.now()-r;e<t&&e>=0?i=setTimeout(c,t-e):(i=void 0,s||l())}let d=function(...e){if(n&&this!==n&&Object.getPrototypeOf(this)===Object.getPrototypeOf(n))throw Error("Debounced method called with different contexts of the same prototype.");n=this,o=e,r=Date.now();let a=s&&!i;if(i||(i=setTimeout(c,t)),a)return l()};return Object.defineProperty(d,"isPending",{get:()=>void 0!==i}),d.clear=()=>{i&&(clearTimeout(i),i=void 0,n=void 0,o=void 0)},d.flush=()=>{i&&d.trigger()},d.trigger=()=>{l(),d.clear()},d}(async()=>{i=t.value.trim(),s=1,e.innerHTML="";let a=await c(i,s,r);console.log(a),d(a._embedded?.events||[])},500)),n.addEventListener("change",async()=>{r=n.value,s=1,e.innerHTML="";let t=await c(i,s,r);d(t._embedded?.events||[])}),new IntersectionObserver(async e=>{if(!e[0].isIntersecting||l)return;l=!0,s+=1;let t=await c(i,s,r);d(t._embedded?.events||[]),l=!1},{rootMargin:"200px"}).observe(a),e&&e.addEventListener("click",async e=>{let t=e.target.closest(".event-card");if(!t)return;let a=await fetch(`https://app.ticketmaster.com/discovery/v2/events/${t.dataset.id}.json?apikey=${o}`);!function(e){let t=e._embedded?.venues?.[0],a=e.images?.[0]?.url||"",n=e._embedded?.attractions?.[0]?.name||"Artist",o=function(e,t=100){return e?e.length<=t?e:e.slice(0,t).trim()+"...":"no info"}(e.info||e.pleaseNote||"Sorry, no info.",100),i=e.url||e._links?.self?.href||"#",r=function(e){let t=e.priceRanges?.[0];if(!t)return"You can look at our Website";let a=t.min??0,n=t.max??a,o=t.currency||"UAH";return a===n?`${a} ${o}`:`${a}-${n} ${o}`}(e),s=document.createElement("div");function l(e){"Escape"===e.key&&c()}s.classList.add("backdrop"),s.innerHTML=`
    <div class="modal">
      <button class="modal-close-btn" type="button">\u{2715}</button>
      
      <div class="circle-thumb">
        <img class="circle" src="${a}" alt="${n}">
      </div>

      <div class="in-modal">
        <img class="modal-img" src="${a}" alt="${n}">

        <div class="modal-text">
          <h2 class="modal-h2">INFO</h2>
          <p class="main-modal-text">${o}</p>

          <h2 class="modal-h2">WHEN</h2>
          <p class="main-modal-text">${e.dates?.start?.localDate||"TBA"}<br>${e.dates?.start?.localTime||""} (${e.dates?.timezone||""})</p>

          <h2 class="modal-h2">WHERE</h2>
          <p class="main-modal-text">${t?.city?.name||""}, ${t?.country?.name||""}<br>${t?.name||""}</p>

          <h2 class="modal-h2">WHO</h2>
          <p class="main-modal-text">${n}</p>

          <h2 class="modal-h2">PRICES</h2>
          <p class="main-modal-text">${r}</p>

          <a class="modal-button modal-tickets" href="${i}" target="_blank" rel="noopener noreferrer">BUY TICKETS</a>
        </div>
      </div>

      <button class="modal-Author" type="button">MORE FROM THIS AUTHOR</button>
    </div>
  `;let c=()=>{document.removeEventListener("keydown",l),s.remove()};s.querySelector(".modal-close-btn").onclick=c,s.onclick=e=>{e.target===s&&c()},document.addEventListener("keydown",l),document.body.appendChild(s)}(await a.json())}),document.addEventListener("keydown",handleEsc);
//# sourceMappingURL=finalproject.39d4e187.js.map
