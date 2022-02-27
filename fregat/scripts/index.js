import Swiper from"./swiper-bundle.min.js";function mobileMenu(){const e=document.querySelector("button.header__button"),t=document.querySelector("nav.header__menu"),a=document.querySelector(".header__links"),n=document.querySelector(".header__wrapper"),r=document.querySelector(".header"),l=document.querySelector("body");function s(){let s="true"===e.getAttribute("aria-expanded");e.setAttribute("aria-expanded",!s),e.classList.toggle("header__button--open"),s?e.setAttribute("aria-label","Открыть главное меню"):e.setAttribute("aria-label","Закрыть главное меню"),t.classList.toggle("header__menu--open"),a.classList.toggle("header__links--open"),n.classList.toggle("header__wrapper--open"),r.classList.toggle("header--open"),l.classList.toggle("lock")}e.addEventListener("click",()=>{s(),n.classList.contains("header__wrapper--open")&&trapFocus(n)}),n.addEventListener("keydown",e=>{if(n.classList.contains("header__wrapper--open")){if(escPressed=27===e.keyCode,!escPressed)return;s()}})}function trapFocus(e){let t=e.querySelectorAll(["a[href]:not([disabled])","button:not([disabled])","textarea:not([disabled])",'input[type="text"]:not([disabled])','input[type="radio"]:not([disabled])','input[type="checkbox"]:not([disabled])',"select:not([disabled])"]),a=t[0],n=t[t.length-1];e.addEventListener("keydown",e=>{9===e.keyCode&&(e.shiftKey?document.activeElement===a&&(n.focus(),e.preventDefault()):document.activeElement===n&&(a.focus(),e.preventDefault()))})}mobileMenu();const headerToggle=()=>{let e=document.querySelector(".header"),t=0;window.addEventListener("scroll",()=>{let a=window.pageYOffset;t>a?e.classList.contains("header--fixed")||headerShow(e):t<a&&e.classList.contains("header--fixed")&&headerHide(e),t=a})},headerShow=e=>{headerFix(!0),e.classList.add("header--animating"),e.classList.add("header--fixed-show"),e.addEventListener("animationend",()=>{e.classList.remove("header--animating"),e.classList.remove("header--fixed-show")},{once:!0})},headerHide=e=>{e.classList.add("header--animating"),e.classList.add("header--fixed-hide"),e.addEventListener("animationend",()=>{e.classList.remove("header--animating"),headerFix(!1),e.classList.remove("header--fixed-hide")},{once:!0})},headerFix=e=>{document.querySelector(".header").classList.toggle("header--fixed",e)};function tabsSet(e,t,a){const n=e,r=t,l=a,s=(e,t)=>{t.focus(),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),e.removeAttribute("aria-selected"),e.setAttribute("tabindex","-1");let a=Array.prototype.indexOf.call(r,t),n=Array.prototype.indexOf.call(r,e);l[n].hidden=!0,l[a].hidden=!1};n.setAttribute("role","tablist"),Array.prototype.forEach.call(r,(e,t)=>{e.setAttribute("role","tab"),e.setAttribute("id","tab"+(t+1)),e.setAttribute("tabindex","-1"),e.parentNode.setAttribute("role","presentation"),e.addEventListener("click",e=>{e.preventDefault();let t=n.querySelector("[aria-selected]");e.currentTarget!==t&&s(t,e.currentTarget)}),e.addEventListener("keydown",e=>{let t=Array.prototype.indexOf.call(r,e.currentTarget),a="ArrowLeft"===e.key?t-1:"ArrowRight"===e.key?t+1:null;null!==a&&(e.preventDefault(),r[a]&&s(e.currentTarget,r[a]))})}),Array.prototype.forEach.call(l,(e,t)=>{e.setAttribute("role","tabpanel"),e.setAttribute("tabindex","-1");e.getAttribute("id");e.setAttribute("aria-labelledby",r[t].id),e.hidden=!0}),r[0].removeAttribute("tabindex"),r[0].setAttribute("aria-selected","true"),l[0].hidden=!1}headerToggle();const tabsStarter=()=>{const e=document.querySelector(".placement__list"),t=document.querySelectorAll(".placement__link"),a=document.querySelectorAll(".placement__subsection");document.querySelector(".placement")&&tabsSet(e,t,a)};tabsStarter();const swiper=new Swiper(".swiper--1, .swiper--2",{loop:!1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{770:{slidesPerView:2,spaceBetween:0},1550:{slidesPerView:3,spaceBetween:0}},simulateTouch:!1}),housingGET=()=>{let e=new XMLHttpRequest;e.open("GET","housing.json"),e.responseType="json",e.send(),e.onload=()=>{const t=e.response.housing,a=document.querySelector(".swiper"),n=document.querySelector(".form-reserve"),r=document.querySelector(".filter-catalog");a&&housingFillSwiper(t),n&&(housingSubmitForm(n),housingSelectForm(t,n)),r&&catalog(t)}},housingFillSwiper=e=>{const t=[document.querySelector(".subsection-placement__list-wrapper--rooms"),document.querySelector(".subsection-placement__list-wrapper--house")],a=(e,t)=>{e.innerHTML=t.map(e=>{return`<li class="swiper-slide subsection-placement__wrapper-item"><article class="subsection-placement__article"><img class="subsection-placement__picture" alt="Фотография номера" src="${e.picture_path}"><h3 class="subsection-placement__title">${e.title}</h3><p class="subsection-placement__desc">${e.desc}</p><ul class="subsection-placement__list">${a=e.options,a.map(e=>`<li class="subsection-placement__item">${e}</li>`).join("")}</ul><span class="subsection-placement__number">Кол-во номеров: ${e.number}</span><span class="subsection-placement__price">Цена за номер: ${e.price}</span><a class="subsection-placement__link" href="/">Подробнее</a><div class="subsection-placement__in-stock"><span class="in-stock__text">Свободные номера:</span><br/><span class="in-stock__designation">${t=e.free,t?"В наличии":"Не в наличии"}</span></div></article></li>`;var t,a}).join("")};t.forEach(t=>{let n=t;if("room"===n.dataset.type){let t=e.filter(e=>"room"===e.type);a(n,t)}else{let t=e.filter(e=>"house"===e.type);a(n,t)}})};function housingSubmitForm(e){const t=e.querySelector('input[name="date-in"]'),a=e.querySelector('input[name="date-out"]');function n(t){const a=new FormData(t);e.checkValidity()?(console.log(Array.from(a.entries())),alert("Ваша заявка успешно отправлена!")):alert("Ваша заявка не отправленна")}e.addEventListener("submit",(function(e){e.preventDefault(),n(e.target)})),e.addEventListener("input",()=>{Number(t.value.replace(/[^0-9]/g,""))>=Number(a.value.replace(/[^0-9]/g,""))?a.setCustomValidity("Дата введена неправильно"):a.setCustomValidity("")})}const housingSelectForm=(e,t)=>{let a=t.querySelector('select[name="housing"]'),n=t.querySelector('select[name="room-select"]'),r=t.querySelector('select[name="house-select"]'),l=[n,r];const s=()=>{let e=t.querySelector('select[name="housing"]');l.forEach(t=>{t.hidden=!0;let a=t.getAttribute("data-type");e.value===a&&(t.hidden=!1)})};n.innerHTML+r.innerHTML===""&&(()=>{const t=(e,t)=>{e.innerHTML=t.map((e,t)=>`<option value="${t+1}">${e.title}</option>`).join("")};l.forEach(a=>{let n=a;if("room"===n.dataset.type){let a=e.filter(e=>"room"===e.type);t(n,a)}else{let a=e.filter(e=>"house"===e.type);t(n,a)}})})(),a.addEventListener("change",()=>{a.value;s()}),s()};housingGET();const catalog=e=>{const t=document.querySelector(".filter-catalog");t.querySelector("#filters"),catalogFill(e),t.addEventListener("input",()=>{catalogFilter(e)})},catalogFilter=e=>{const t=[...document.querySelectorAll("input:checked[name='type']")].map(e=>e.value),a=[...document.querySelectorAll("input:checked[name='balcony']")].map(e=>e.value),n=[...document.querySelectorAll("input:checked[name='bed']")].map(e=>e.value),r=[...document.querySelectorAll("input:checked[name='view']")].map(e=>e.value),l=document.querySelector("input[name='priceMin']").value,s=document.querySelector("input[name='priceMax']").value;catalogFill(e.filter(e=>(!t.length||t.includes(e.type))&&(!a.length||a.includes(e.balcony))&&(!n.length||n.includes(e.bed))&&(!r.length||r.includes(e.view))&&(!l.length||l<=Number(e.price.replace(/[^0-9]/g,"")))&&(!s.length||s>=Number(e.price.replace(/[^0-9]/g,"")))))},catalogFill=e=>{const t=document.querySelector(".catalog__list");t.innerHTML=e.map(e=>{return`<article class="catalog__article article-catalog">\n      <img\n        class="article-catalog__picture"\n        alt="Фотография номера"\n        src="${e.picture_path}"\n      />\n      <h3 class="article-catalog__title">${e.title}</h3>\n      <p class="article-catalog__desc">${e.desc}</p>\n      <ul class="article-catalog__list">${a=e.options,a.map(e=>`<li class="article-catalog__item">${e}</li>`).join("")}</ul>\n      <span class="article-catalog__number">Кол-во номеров: ${e.number}</span\n      ><span class="article-catalog__price">Цена за номер: ${e.price}</span\n      ><a class="article-catalog__link" href="${e.link_href}">Подробнее</a>\n      <div class="article-catalog__in-stock">\n        <span class="in-stock__text">Свободные номера:</span><br /><span\n          class="in-stock__designation"\n          >${t=e.free,t?"В наличии":"Не в наличии"}</span\n        >\n      </div>\n    </article>`;var t,a}).join("")},reserveButtonScroll=()=>{const e=document.querySelectorAll('*[name="scroll_reserve"]'),t=document.querySelector(".reserve"),a=()=>{t.scrollIntoView({block:"center",behavior:"smooth"})};e.forEach(e=>{e.addEventListener("click",a)})};reserveButtonScroll();const contactsLinkScroll=()=>{const e=document.querySelector('*[name="scroll_contacts"]'),t=document.querySelector(".contacts");e.addEventListener("click",e=>{e.preventDefault(),t.scrollIntoView({block:"center",behavior:"smooth"})},!1)};contactsLinkScroll();