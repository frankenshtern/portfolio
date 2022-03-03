import Swiper from "./swiper-bundle.min.js";

const hrefCorrection = () => {
  const links = Array.from(document.querySelectorAll("a[href]"));

  const linksFiltered = links.filter((a) => {
    const v = a.getAttribute("href");

    const b =
      v.includes("http") ||
      v.includes("tel") ||
      v.includes("mailto") ||
      a.hasAttribute("id");
    return !b;
  });
  hrefCorrect(linksFiltered);
};

const hrefCorrect = (linksFiltered) => {
  const urlRaw = document.location.href;

  const linksHrefSet = (href, link) => {
    const linkHref = link.getAttribute("href");

    link.setAttribute("href", href + linkHref);
  };

  if (urlRaw.includes("src")) {
    const href = "/src";

    linksFiltered.forEach((item) => {
      linksHrefSet(href, item);
    });
  }

  if (urlRaw.includes("platform")) {
    const href = "/platform/fregat";

    linksFiltered.forEach((item) => {
      linksHrefSet(href, item);
    });
  }
};

hrefCorrection();

const linksHrefCorrect = (a) => {
  let linkHref = a;

  let href = "";
  console.log(linkHref);
  if (document.location.href.includes("src")) {
    href = "/src";
  } else {
    return href + linkHref;
  }

  if (document.location.href.includes("platform")) {
    href = "/platform/fregat";
  } else {
    return href + linkHref;
  }
};

function mobileMenu() {
  const mobileButton = document.querySelector("button.header__button");
  const mobileMenu = document.querySelector("nav.header__menu");
  const mobileLinks = document.querySelector(".header__links");
  const headerWrapper = document.querySelector(".header__wrapper");
  const header = document.querySelector(".header");
  const body = document.querySelector("body");

  function toggleMobileMenu() {
    let expanded = mobileButton.getAttribute("aria-expanded") === "true";
    mobileButton.setAttribute("aria-expanded", !expanded);
    mobileButton.classList.toggle("header__button--open");
    expanded
      ? mobileButton.setAttribute("aria-label", "Открыть главное меню")
      : mobileButton.setAttribute("aria-label", "Закрыть главное меню");
    mobileMenu.classList.toggle("header__menu--open");
    mobileLinks.classList.toggle("header__links--open");
    headerWrapper.classList.toggle("header__wrapper--open");
    header.classList.toggle("header--open");
    body.classList.toggle("lock");
  }

  mobileButton.addEventListener("click", () => {
    toggleMobileMenu();
    if (headerWrapper.classList.contains("header__wrapper--open")) {
      trapFocus(headerWrapper);
    }
  });

  headerWrapper.addEventListener("keydown", (a) => {
    if (headerWrapper.classList.contains("header__wrapper--open")) {
      escPressed = a.keyCode === 27;
      if (!escPressed) {
        return;
      } else {
        toggleMobileMenu();
      }
    }
  });
}

function trapFocus(element) {
  let focusableEls = element.querySelectorAll([
    "a[href]:not([disabled])",
    "button:not([disabled])",
    "textarea:not([disabled])",
    'input[type="text"]:not([disabled])',
    'input[type="radio"]:not([disabled])',
    'input[type="checkbox"]:not([disabled])',
    "select:not([disabled])",
  ]);
  let firstFocusableEl = focusableEls[0];
  let lastFocusableEl = focusableEls[focusableEls.length - 1];

  element.addEventListener("keydown", (e) => {
    let isTabPressed = e.keyCode === 9;
    if (!isTabPressed) {
      return;
    }
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  });
}

mobileMenu();

const headerToggle = () => {
  const headerOnScroll = () => {
    let top = window.pageYOffset;
    if (lastScrollTop > top) {
      if (!header.classList.contains("header--fixed")) {
        headerShow(header);
      }
    } else if (lastScrollTop < top) {
      if (header.classList.contains("header--fixed")) {
        headerHide(header);
      }
    }
    lastScrollTop = top;
  };

  let header = document.querySelector(".header");
  let lastScrollTop = 0;
  window.addEventListener("scroll", headerOnScroll);
};

const headerShow = (header) => {
  headerFix(true);
  header.classList.add("header--animating");
  header.classList.add("header--fixed-show");
  header.addEventListener(
    "animationend",
    () => {
      header.classList.remove("header--animating");
      header.classList.remove("header--fixed-show");
    },
    { once: true }
  );
};

const headerHide = (header) => {
  header.classList.add("header--animating");
  header.classList.add("header--fixed-hide");
  header.addEventListener(
    "animationend",
    () => {
      header.classList.remove("header--animating");
      headerFix(false);
      header.classList.remove("header--fixed-hide");
    },
    { once: true }
  );
};

const headerFix = (flag) => {
  let header = document.querySelector(".header");
  header.classList.toggle("header--fixed", flag);
};

const headerToggleStarter = () => {
  window.addEventListener(
    "scroll",
    () => {
      if (
        document.documentElement.scrollHeight >=
        document.documentElement.clientHeight * 1.2
      ) {
        headerToggle();
      }
    },
    { once: true }
  );
};
headerToggleStarter();

function tabsSet(tablist, tabs, panels) {
  const switchTab = (oldTab, newTab) => {
    newTab.focus();
    newTab.removeAttribute("tabindex");
    newTab.setAttribute("aria-selected", "true");
    oldTab.removeAttribute("aria-selected");
    oldTab.setAttribute("tabindex", "-1");
    let index = Array.prototype.indexOf.call(tabs, newTab);
    let oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
    panels[oldIndex].hidden = true;
    panels[index].hidden = false;
  };

  tablist.setAttribute("role", "tablist");

  Array.prototype.forEach.call(tabs, (tab, i) => {
    tab.setAttribute("role", "tab");
    tab.setAttribute("id", "tab" + (i + 1));
    tab.setAttribute("tabindex", "-1");
    tab.parentNode.setAttribute("role", "presentation");

    tab.addEventListener("click", (e) => {
      e.preventDefault();
      let currentTab = tablist.querySelector("[aria-selected]");
      if (e.currentTarget !== currentTab) {
        switchTab(currentTab, e.currentTarget);
      }
    });

    tab.addEventListener("keydown", (e) => {
      let index = Array.prototype.indexOf.call(tabs, e.currentTarget);
      let dir =
        e.key === "ArrowLeft"
          ? index - 1
          : e.key === "ArrowRight"
          ? index + 1
          : null;
      if (dir !== null) {
        e.preventDefault();
        tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) : void 0;
      }
    });
  });

  Array.prototype.forEach.call(panels, (panel, i) => {
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("tabindex", "-1");
    let id = panel.getAttribute("id");
    panel.setAttribute("aria-labelledby", tabs[i].id);
    panel.hidden = true;
  });

  tabs[0].removeAttribute("tabindex");
  tabs[0].setAttribute("aria-selected", "true");
  panels[0].hidden = false;
}

const tabsStart = () => {
  const tablist = document.querySelector(".placement__list");
  const tabs = document.querySelectorAll(".placement__link");
  const panels = document.querySelectorAll(".placement__subsection");

  if (tablist && tabs && panels) {
    tabsSet(tablist, tabs, panels);
  }
};

tabsStart();

const swiper = new Swiper(".swiper--1, .swiper--2", {
  loop: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    770: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    1550: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
  },
  simulateTouch: false,
});

const housingGET = () => {
  let json = "housing.json";

  if (document.querySelector("body[data-type]")) {
    json = "../housing.json";
  }

  let request = new XMLHttpRequest();
  request.open("GET", json);
  request.responseType = "json";
  request.send();

  request.onload = () => {
    const requestData = request.response;
    const data = requestData.housing;
    const swiperEl = document.querySelector(".swiper");
    const formEl = document.querySelector(".form-reserve");
    const filterEl = document.querySelector(".filter-catalog");

    if (swiperEl) {
      housingFillSwiper(data);
    }

    if (formEl) {
      housingSubmitForm(formEl);
      housingSelectForm(data, formEl);
    }

    if (filterEl) {
      catalog(data);
    }

    if (document.querySelector("body[data-type]")) {
      productFill(data);
    }
  };
};

const housingFillSwiper = (data) => {
  const housingListArr = [
    document.querySelector(".subsection-placement__list-wrapper--rooms"),
    document.querySelector(".subsection-placement__list-wrapper--house"),
  ];

  const optionFill = (dataOption) => {
    const returnedOptions = dataOption
      .map((a) => `<li class="subsection-placement__item">${a}</li>`)
      .join("");

    return returnedOptions;
  };

  const housingArrFill = (list, arr) => {
    const inStock = (dataInStock) => {
      if (dataInStock) {
        return "В наличии";
      } else {
        return "Не в наличии";
      }
    };

    list.innerHTML = arr
      .map(
        (a) =>
          `<li class="swiper-slide subsection-placement__wrapper-item"><article class="subsection-placement__article"><img class="subsection-placement__picture" alt="Фотография номера" src="${
            a.picture_path
          }"><h3 class="subsection-placement__title">${
            a.title
          }</h3><p class="subsection-placement__desc">${
            a.desc
          }</p><ul class="subsection-placement__list">${optionFill(
            a.options
          )}</ul><span class="subsection-placement__number">Кол-во номеров: ${
            a.number
          }</span><span class="subsection-placement__price">Цена за номер: ${
            a.price
          }</span><a class="subsection-placement__link" href="${linksHrefCorrect(
            a.link_href
          )}">Подробнее</a><div class="subsection-placement__in-stock"><span class="in-stock__text">Свободные номера:</span><br/><span class="in-stock__designation">${inStock(
            a.free
          )}</span></div></article></li>`
      )
      .join("");
  };
  housingListArr.forEach((element) => {
    let list = element;

    if (list.dataset.type === "rooms") {
      let result = data.filter((element) => element.type === "room");
      housingArrFill(list, result);
    } else {
      let result = data.filter((element) => element.type === "house");
      housingArrFill(list, result);
    }
  });
};

function housingSubmitForm(form) {
  const formInputDateIn = form.querySelector('input[name="date-in"]');
  const formInputDateOut = form.querySelector('input[name="date-out"]');

  function onSuccess() {
    alert("Ваша заявка успешно отправлена!");
  }

  function onError() {
    alert("Ваша заявка не отправленна");
  }

  function serializeForm(formNode) {
    const data = new FormData(formNode);
    if (checkValid()) {
      console.log(Array.from(data.entries()));
      onSuccess();
    } else {
      onError();
    }
  }

  function checkValid() {
    const formValid = form.checkValidity();
    return formValid;
  }

  const checkDate = () => {
    let numberDateIn = Number(formInputDateIn.value.replace(/[^0-9]/g, ""));
    let numberDateOut = Number(formInputDateOut.value.replace(/[^0-9]/g, ""));
    if (numberDateIn >= numberDateOut) {
      formInputDateOut.setCustomValidity("Дата введена неправильно");
    } else {
      formInputDateOut.setCustomValidity("");
    }
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    serializeForm(event.target);
  }

  form.addEventListener("submit", handleFormSubmit);
  form.addEventListener("input", checkDate);
}

const housingSelectForm = (data, form) => {
  let formSelectSwitcher = form.querySelector('select[name="housing"]');

  let formSelectRoom = form.querySelector('select[name="room-select"]');
  let formSelectHouse = form.querySelector('select[name="house-select"]');

  let formSelectArray = [formSelectRoom, formSelectHouse];

  const housingFillSelect = () => {
    const selectArrFill = (select, arr) => {
      select.innerHTML = arr
        .map((a, index) => `<option value="${index + 1}">${a.title}</option>`)
        .join("");
    };

    formSelectArray.forEach((element) => {
      let select = element;

      if (select.dataset.type === "room") {
        let result = data.filter((element) => element.type === "room");
        selectArrFill(select, result);
      } else {
        let result = data.filter((element) => element.type === "house");
        selectArrFill(select, result);
      }
    });
  };

  const housingSelectToogle = () => {
    let selectToggle = form.querySelector('select[name="housing"]');
    formSelectArray.forEach((item) => {
      item.hidden = true;
      let optionAttribute = item.getAttribute("data-type");

      if (selectToggle.value === optionAttribute) {
        item.hidden = false;
      }
    });
  };

  if (formSelectRoom.innerHTML + formSelectHouse.innerHTML === "") {
    housingFillSelect();
  }

  formSelectSwitcher.addEventListener("change", () => {
    const selectValue = formSelectSwitcher.value;

    housingSelectToogle(selectValue);
  });

  housingSelectToogle();
};

housingGET();

const catalog = (data) => {
  const filter = document.querySelector(".filter-catalog");

  filter.querySelector("#filters");

  catalogFill(data);

  filter.addEventListener("input", () => {
    catalogFilter(data);
  });
};

const catalogFilter = (data) => {
  const filterCheckboxType = [
    ...document.querySelectorAll("input:checked[name='type']"),
  ].map((a) => a.value);
  const filterCheckboxBalcony = [
    ...document.querySelectorAll("input:checked[name='balcony']"),
  ].map((a) => a.value);
  const filterCheckboxBed = [
    ...document.querySelectorAll("input:checked[name='bed']"),
  ].map((a) => a.value);
  const filterCheckboxView = [
    ...document.querySelectorAll("input:checked[name='view']"),
  ].map((a) => a.value);
  const filterPriceMin = document.querySelector("input[name='priceMin']").value;
  const filterPriceMax = document.querySelector("input[name='priceMax']").value;

  catalogFill(
    data.filter(
      (a) =>
        (!filterCheckboxType.length || filterCheckboxType.includes(a.type)) &&
        (!filterCheckboxBalcony.length ||
          filterCheckboxBalcony.includes(a.balcony)) &&
        (!filterCheckboxBed.length || filterCheckboxBed.includes(a.bed)) &&
        (!filterCheckboxView.length || filterCheckboxView.includes(a.view)) &&
        (!filterPriceMin.length ||
          filterPriceMin <= Number(a.price.replace(/[^0-9]/g, ""))) &&
        (!filterPriceMax.length ||
          filterPriceMax >= Number(a.price.replace(/[^0-9]/g, "")))
    )
  );
};

const catalogFill = (catalogData) => {
  const list = document.querySelector(".catalog__list");

  const optionFill = (dataOption) => {
    const returnedOptions = dataOption
      .map((a) => `<li class="article-catalog__item">${a}</li>`)
      .join("");

    return returnedOptions;
  };

  const inStock = (dataInStock) => {
    if (dataInStock) {
      return "В наличии";
    } else {
      return "Не в наличии";
    }
  };

  list.innerHTML = catalogData
    .map(
      (a) => `<article class="catalog__article article-catalog">
      <img
        class="article-catalog__picture"
        alt="Фотография номера"
        src="${a.picture_path}"
      />
      <h3 class="article-catalog__title">${a.title}</h3>
      <p class="article-catalog__desc">${a.desc}</p>
      <ul class="article-catalog__list">${optionFill(a.options)}</ul>
      <span class="article-catalog__number">Кол-во номеров: ${a.number}</span
      ><span class="article-catalog__price">Цена за номер: ${a.price}</span
      ><a class="article-catalog__link" href="${linksHrefCorrect(
        a.link_href
      )}">Подробнее</a>
      <div class="article-catalog__in-stock">
        <span class="in-stock__text">Свободные номера:</span><br /><span
          class="in-stock__designation"
          >${inStock(a.free)}</span
        >
      </div>
    </article>`
    )
    .join("");
};

const scrollSet = () => {
  const links = document.querySelectorAll("*[data-scroll]");

  links.forEach((item) => {
    const goalId = item.dataset.scroll;
    const goal = document.querySelector(`${goalId}`);
    scrollRealization(item, goal);
  });
};

const scrollRealization = (link, goal) => {
  link.addEventListener(
    "click",
    (event) => {
      if (!goal == false) {
        event.preventDefault();
        goal.scrollIntoView({ block: "center", behavior: "smooth" });
      } else {
        console.log(link, goal);
      }
    },
    false
  );
};

scrollSet();

const filterToggle = () => {
  const filterButton = document.querySelector(".catalog__button-filter");
  const filterElement = document.querySelector(".catalog__filter");

  if (filterButton) {
    filterButton.addEventListener("click", () => {
      toggleFilter();
    });
  }

  const toggleFilter = () => {
    let expanded = filterButton.getAttribute("aria-expanded") === "true";
    filterButton.setAttribute("aria-expanded", !expanded);
    filterButton.classList.toggle("catalog__button-filter--open");
    filterElement.classList.toggle("catalog__filter--open");

    if (expanded) {
      filterButton.setAttribute("aria-label", "Открыть фильтр");
      filterButton.innerHTML = "Открыть фильтр";
    } else {
      filterButton.setAttribute("aria-label", "Закрыть фильтр");
      filterButton.innerHTML = "Закрыть фильтр";
    }
  };
};

filterToggle();

const productFilling = (arr) => {
  const data = arr[0];

  const productElement = document.querySelector(".product__article");

  const optionFill = (dataOption) => {
    const returnedOptions = dataOption
      .map((a) => `<li class="article-product__item">${a}</li>`)
      .join("");

    return returnedOptions;
  };

  const inStock = (dataInStock) => {
    if (dataInStock) {
      return "В наличии";
    } else {
      return "Не в наличии";
    }
  };

  const hrefReserve = "/#reserve";

  productElement.innerHTML = `<img
    class="article-product__picture"
    alt="Фотография номера"
    src="../${data.picture_path}"
  />
  <h3 class="article-product__title">${data.title}</h3>
  <p class="article-product__desc">${data.desc}</p>
  <ul class="article-product__list">${optionFill(data.options)}</ul>
  <span class="article-product__number">Кол-во номеров: ${data.number}</span
  ><span class="article-product__price">Цена за номер: ${data.price}</span
  ><a class="article-product__link" data-scroll="#reserve" href="${linksHrefCorrect(
    hrefReserve
  )}">Забронировать</a>
  <div class="article-product__in-stock">
    <span class="in-stock__text">Свободные номера:</span><br /><span
      class="in-stock__designation"
      >${inStock(data.free)}</span
    >
  </div>`;
};

const productFill = (data) => {
  const body = document.querySelector("body[data-type]");

  const productType = body.dataset.type;
  const productNumber = body.dataset.number;

  const productArray = data.filter(
    (a, index) => a.type === productType && index === productNumber - 1
  );

  productFilling(productArray);
};
