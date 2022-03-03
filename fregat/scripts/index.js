import Swiper from"./swiper-bundle.min.js";function mobileMenu(){const e=document.querySelector("button.header__button"),t=document.querySelector("nav.header__menu"),r=document.querySelector(".header__links"),a=document.querySelector(".header__wrapper"),n=document.querySelector(".header"),l=document.querySelector("body");function c(){let c="true"===e.getAttribute("aria-expanded");e.setAttribute("aria-expanded",!c),e.classList.toggle("header__button--open"),c?e.setAttribute("aria-label","Открыть главное меню"):e.setAttribute("aria-label","Закрыть главное меню"),t.classList.toggle("header__menu--open"),r.classList.toggle("header__links--open"),a.classList.toggle("header__wrapper--open"),n.classList.toggle("header--open"),l.classList.toggle("lock")}e.addEventListener("click",()=>{c(),a.classList.contains("header__wrapper--open")&&trapFocus(a)}),a.addEventListener("keydown",e=>{if(a.classList.contains("header__wrapper--open")){if(escPressed=27===e.keyCode,!escPressed)return;c()}})}function trapFocus(e){let t=e.querySelectorAll(["a[href]:not([disabled])","button:not([disabled])","textarea:not([disabled])",'input[type="text"]:not([disabled])','input[type="radio"]:not([disabled])','input[type="checkbox"]:not([disabled])',"select:not([disabled])"]),r=t[0],a=t[t.length-1];e.addEventListener("keydown",e=>{9===e.keyCode&&(e.shiftKey?document.activeElement===r&&(a.focus(),e.preventDefault()):document.activeElement===a&&(r.focus(),e.preventDefault()))})}mobileMenu();const headerToggle=()=>{let e=document.querySelector(".header"),t=0;window.addEventListener("scroll",()=>{let r=window.pageYOffset;t>r?e.classList.contains("header--fixed")||headerShow(e):t<r&&e.classList.contains("header--fixed")&&headerHide(e),t=r})},headerShow=e=>{headerFix(!0),e.classList.add("header--animating"),e.classList.add("header--fixed-show"),e.addEventListener("animationend",()=>{e.classList.remove("header--animating"),e.classList.remove("header--fixed-show")},{once:!0})},headerHide=e=>{e.classList.add("header--animating"),e.classList.add("header--fixed-hide"),e.addEventListener("animationend",()=>{e.classList.remove("header--animating"),headerFix(!1),e.classList.remove("header--fixed-hide")},{once:!0})},headerFix=e=>{document.querySelector(".header").classList.toggle("header--fixed",e)},headerToggleStarter=()=>{window.addEventListener("scroll",()=>{document.documentElement.scrollHeight>=1.2*document.documentElement.clientHeight&&headerToggle()},{once:!0})};function tabsSet(e,t,r){const a=(e,a)=>{a.focus(),a.removeAttribute("tabindex"),a.setAttribute("aria-selected","true"),e.removeAttribute("aria-selected"),e.setAttribute("tabindex","-1");let n=Array.prototype.indexOf.call(t,a),l=Array.prototype.indexOf.call(t,e);r[l].hidden=!0,r[n].hidden=!1};e.setAttribute("role","tablist"),Array.prototype.forEach.call(t,(r,n)=>{r.setAttribute("role","tab"),r.setAttribute("id","tab"+(n+1)),r.setAttribute("tabindex","-1"),r.parentNode.setAttribute("role","presentation"),r.addEventListener("click",t=>{t.preventDefault();let r=e.querySelector("[aria-selected]");t.currentTarget!==r&&a(r,t.currentTarget)}),r.addEventListener("keydown",e=>{let r=Array.prototype.indexOf.call(t,e.currentTarget),n="ArrowLeft"===e.key?r-1:"ArrowRight"===e.key?r+1:null;null!==n&&(e.preventDefault(),t[n]&&a(e.currentTarget,t[n]))})}),Array.prototype.forEach.call(r,(e,r)=>{e.setAttribute("role","tabpanel"),e.setAttribute("tabindex","-1");e.getAttribute("id");e.setAttribute("aria-labelledby",t[r].id),e.hidden=!0}),t[0].removeAttribute("tabindex"),t[0].setAttribute("aria-selected","true"),r[0].hidden=!1}window.addEventListener("scroll",()=>{document.documentElement.scrollHeight>=1.2*document.documentElement.clientHeight&&headerToggle()},{once:!0});const tabsStart=()=>{const e=document.querySelector(".placement__list"),t=document.querySelectorAll(".placement__link"),r=document.querySelectorAll(".placement__subsection");e&&t&&r&&tabsSet(e,t,r)};tabsStart();const swiper=new Swiper(".swiper--1, .swiper--2",{loop:!1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{770:{slidesPerView:2,spaceBetween:0},1550:{slidesPerView:3,spaceBetween:0}},simulateTouch:!1}),housingGET=()=>{let e="housing.json";document.querySelector("body[data-type]")&&(e="../housing.json");let t=new XMLHttpRequest;t.open("GET",e),t.responseType="json",t.send(),t.onload=()=>{const e=t.response.housing,r=document.querySelector(".swiper"),a=document.querySelector(".form-reserve"),n=document.querySelector(".filter-catalog");r&&housingFillSwiper(e),a&&(housingSubmitForm(a),housingSelectForm(e,a)),n&&catalog(e),document.querySelector("body[data-type]")&&productFill(e)}},housingFillSwiper=e=>{const t=[document.querySelector(".subsection-placement__list-wrapper--rooms"),document.querySelector(".subsection-placement__list-wrapper--house")],r=(e,t)=>{e.innerHTML=t.map(e=>{return`<li class="swiper-slide subsection-placement__wrapper-item"><article class="subsection-placement__article"><img class="subsection-placement__picture" alt="Фотография номера" src="${e.picture_path}"><h3 class="subsection-placement__title">${e.title}</h3><p class="subsection-placement__desc">${e.desc}</p><ul class="subsection-placement__list">${r=e.options,r.map(e=>`<li class="subsection-placement__item">${e}</li>`).join("")}</ul><span class="subsection-placement__number">Кол-во номеров: ${e.number}</span><span class="subsection-placement__price">Цена за номер: ${e.price}</span><a class="subsection-placement__link" href="${e.link_href}">Подробнее</a><div class="subsection-placement__in-stock"><span class="in-stock__text">Свободные номера:</span><br/><span class="in-stock__designation">${t=e.free,t?"В наличии":"Не в наличии"}</span></div></article></li>`;var t,r}).join("")};t.forEach(t=>{let a=t;if("rooms"===a.dataset.type){let t=e.filter(e=>"room"===e.type);r(a,t)}else{let t=e.filter(e=>"house"===e.type);r(a,t)}})};function housingSubmitForm(e){const t=e.querySelector('input[name="date-in"]'),r=e.querySelector('input[name="date-out"]');function a(t){const r=new FormData(t);e.checkValidity()?(console.log(Array.from(r.entries())),alert("Ваша заявка успешно отправлена!")):alert("Ваша заявка не отправленна")}e.addEventListener("submit",(function(e){e.preventDefault(),a(e.target)})),e.addEventListener("input",()=>{Number(t.value.replace(/[^0-9]/g,""))>=Number(r.value.replace(/[^0-9]/g,""))?r.setCustomValidity("Дата введена неправильно"):r.setCustomValidity("")})}const housingSelectForm=(e,t)=>{let r=t.querySelector('select[name="housing"]'),a=t.querySelector('select[name="room-select"]'),n=t.querySelector('select[name="house-select"]'),l=[a,n];const c=()=>{let e=t.querySelector('select[name="housing"]');l.forEach(t=>{t.hidden=!0;let r=t.getAttribute("data-type");e.value===r&&(t.hidden=!1)})};a.innerHTML+n.innerHTML===""&&(()=>{const t=(e,t)=>{e.innerHTML=t.map((e,t)=>`<option value="${t+1}">${e.title}</option>`).join("")};l.forEach(r=>{let a=r;if("room"===a.dataset.type){let r=e.filter(e=>"room"===e.type);t(a,r)}else{let r=e.filter(e=>"house"===e.type);t(a,r)}})})(),r.addEventListener("change",()=>{r.value;c()}),c()};housingGET();const catalog=e=>{const t=document.querySelector(".filter-catalog");t.querySelector("#filters"),catalogFill(e),t.addEventListener("input",()=>{catalogFilter(e)})},catalogFilter=e=>{const t=[...document.querySelectorAll("input:checked[name='type']")].map(e=>e.value),r=[...document.querySelectorAll("input:checked[name='balcony']")].map(e=>e.value),a=[...document.querySelectorAll("input:checked[name='bed']")].map(e=>e.value),n=[...document.querySelectorAll("input:checked[name='view']")].map(e=>e.value),l=document.querySelector("input[name='priceMin']").value,c=document.querySelector("input[name='priceMax']").value;catalogFill(e.filter(e=>(!t.length||t.includes(e.type))&&(!r.length||r.includes(e.balcony))&&(!a.length||a.includes(e.bed))&&(!n.length||n.includes(e.view))&&(!l.length||l<=Number(e.price.replace(/[^0-9]/g,"")))&&(!c.length||c>=Number(e.price.replace(/[^0-9]/g,"")))))},catalogFill=e=>{const t=document.querySelector(".catalog__list");t.innerHTML=e.map(e=>{return`<article class="catalog__article article-catalog">\n      <img\n        class="article-catalog__picture"\n        alt="Фотография номера"\n        src="${e.picture_path}"\n      />\n      <h3 class="article-catalog__title">${e.title}</h3>\n      <p class="article-catalog__desc">${e.desc}</p>\n      <ul class="article-catalog__list">${r=e.options,r.map(e=>`<li class="article-catalog__item">${e}</li>`).join("")}</ul>\n      <span class="article-catalog__number">Кол-во номеров: ${e.number}</span\n      ><span class="article-catalog__price">Цена за номер: ${e.price}</span\n      ><a class="article-catalog__link" href="${e.link_href}">Подробнее</a>\n      <div class="article-catalog__in-stock">\n        <span class="in-stock__text">Свободные номера:</span><br /><span\n          class="in-stock__designation"\n          >${t=e.free,t?"В наличии":"Не в наличии"}</span\n        >\n      </div>\n    </article>`;var t,r}).join("")},scrollSet=()=>{document.querySelectorAll("*[data-scroll]").forEach(e=>{const t=e.dataset.scroll,r=document.querySelector(""+t);scrollRealization(e,r)})},scrollRealization=(e,t)=>{e.addEventListener("click",r=>{0==!t?(r.preventDefault(),t.scrollIntoView({block:"center",behavior:"smooth"})):console.log(e,t)},!1)};document.querySelectorAll("*[data-scroll]").forEach(e=>{const t=e.dataset.scroll,r=document.querySelector(""+t);scrollRealization(e,r)});const filterToggle=()=>{const e=document.querySelector(".catalog__button-filter"),t=document.querySelector(".catalog__filter");e&&e.addEventListener("click",()=>{r()});const r=()=>{let r="true"===e.getAttribute("aria-expanded");e.setAttribute("aria-expanded",!r),e.classList.toggle("catalog__button-filter--open"),t.classList.toggle("catalog__filter--open"),r?(e.setAttribute("aria-label","Открыть фильтр"),e.innerHTML="Открыть фильтр"):(e.setAttribute("aria-label","Закрыть фильтр"),e.innerHTML="Закрыть фильтр")}};filterToggle();const productFilling=e=>{const t=e[0];var r,a;document.querySelector(".product__article").innerHTML=`<img\n    class="article-product__picture"\n    alt="Фотография номера"\n    src="../${t.picture_path}"\n  />\n  <h3 class="article-product__title">${t.title}</h3>\n  <p class="article-product__desc">${t.desc}</p>\n  <ul class="article-product__list">${a=t.options,a.map(e=>`<li class="article-product__item">${e}</li>`).join("")}</ul>\n  <span class="article-product__number">Кол-во номеров: ${t.number}</span\n  ><span class="article-product__price">Цена за номер: ${t.price}</span\n  ><a class="article-product__link" data-scroll="" href="/#reserve">Забронировать</a>\n  <div class="article-product__in-stock">\n    <span class="in-stock__text">Свободные номера:</span><br /><span\n      class="in-stock__designation"\n      >${r=t.free,r?"В наличии":"Не в наличии"}</span\n    >\n  </div>`},productFill=e=>{const t=document.querySelector("body[data-type]"),r=t.dataset.type,a=t.dataset.number,n=e.filter((e,t)=>e.type===r&&t===a-1);productFilling(n)},hrefCorrection=()=>{const e=window.location.href,t=Array.from(document.querySelectorAll("a[href]")).filter(e=>{const t=e.getAttribute("href");return!(t.includes("http")||t.includes("tel")||t.includes("mailto")||e.hasAttribute("id"))}),r=(e,t)=>{const r=t.getAttribute("href");t.setAttribute("href",e+r)};if(e.includes("src")){const e="/src";t.forEach(t=>{r(e,t)})}if(e.includes("platform")){const e="/platform/fregat";t.forEach(t=>{r(e,t)})}};hrefCorrection();