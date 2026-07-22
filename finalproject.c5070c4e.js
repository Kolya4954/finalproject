let e=document.querySelector(".main-list"),t=document.querySelector(".header-input"),n=document.querySelector(".loader"),o="",r=1,i=!1;async function a(e,t){let n=await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=hXUd5IDKsavTl95aAOfGkyFDSk68VDlw&keyword=${e}&page=${t}`);return await n.json()}function s(t){let n=t.map(e=>{let t=e.images[0]?.url,n=e.name.length>17?e.name.slice(0,17)+"...":e.name,o=e.dates.start.localDate,r=e._embedded?.venues[0]?.city?.name||"Unknown";return`
        <li class="event-card">
            <img src="${t}" alt="${n}" class="img">

            <h2 class="name">${n}</h2>

            <p class="date">${o}</p>

            <p class="city">${r}</p>
        </li>`}).join("");e.insertAdjacentHTML("beforeend",n)}t.addEventListener("input",function(e,t=100,n={}){let o,r,i,a;if("function"!=typeof e)throw TypeError(`Expected the first parameter to be a function, got \`${typeof e}\`.`);if(t<0)throw RangeError("`wait` must not be negative.");if("boolean"==typeof n)throw TypeError("The `options` parameter must be an object, not a boolean. Use `{immediate: true}` instead.");let{immediate:s}=n;function c(){let t=o,n=r;return o=void 0,r=void 0,e.apply(t,n)}function l(){let e=Date.now()-a;e<t&&e>=0?i=setTimeout(l,t-e):(i=void 0,s||c())}let d=function(...e){if(o&&this!==o&&Object.getPrototypeOf(this)===Object.getPrototypeOf(o))throw Error("Debounced method called with different contexts of the same prototype.");o=this,r=e,a=Date.now();let n=s&&!i;if(i||(i=setTimeout(l,t)),n)return c()};return Object.defineProperty(d,"isPending",{get:()=>void 0!==i}),d.clear=()=>{i&&(clearTimeout(i),i=void 0,o=void 0,r=void 0)},d.flush=()=>{i&&d.trigger()},d.trigger=()=>{c(),d.clear()},d}(async()=>{o=t.value.trim(),r=1,e.innerHTML="";let n=await a(o,r);console.log(n),s(n._embedded?.events||[])},500)),new IntersectionObserver(async e=>{if(!e[0].isIntersecting||i)return;i=!0,r+=1;let t=await a(o,r);s(t._embedded?.events||[]),i=!1},{rootMargin:"200px"}).observe(n),async function(){r=1;let e=await a("",r);s(e._embedded?.events||[])}();
//# sourceMappingURL=finalproject.c5070c4e.js.map
