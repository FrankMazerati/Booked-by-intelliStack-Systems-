import { route, navigate, renderCurrent } from "./router.js";
import { getState, createUser } from "./state.js";

/* =========================================================
   BOOKED BRAND
========================================================= */

function brand() {
  return `
    <a class="brand" href="#/">
      <span class="brand-mark">B</span>
      <span>BOOKED</span>
    </a>
  `;
}

/* =========================================================
   MAIN LAYOUT
========================================================= */

function layout(content, topbar = true, theme = "theme-default") {
  return `
    <div class="screen ${theme}">

      ${
        topbar
          ? `
            <header class="topbar">
              <div class="container">
                ${brand()}
              </div>
            </header>
          `
          : ""
      }

      ${content}

    </div>
  `;
}

/* =========================================================
   CATEGORY DATA
========================================================= */

const categories = [
  {
    label: "Hair & Beauty",
    icon: "✂️",
    theme: "theme-beauty",
    services: [
      "Women's Haircut",
      "Blowout",
      "Hair Color"
    ]
  },

  {
    label: "Fitness",
    icon: "⚡",
    theme: "theme-fitness",
    services: [
      "Personal Training",
      "Boxing",
      "Yoga Session"
    ]
  },

  {
    label: "Nails",
    icon: "💎",
    theme: "theme-beauty",
    services: [
      "Gel Manicure",
      "Acrylic Set",
      "Nail Art"
    ]
  },

  {
    label: "Barbers",
    icon: "💈",
    theme: "theme-barbers",
    services: [
      "Men's Haircut",
      "Beard Trim",
      "Skin Fade"
    ]
  },

  {
    label: "Makeup",
    icon: "💄",
    theme: "theme-beauty",
    services: [
      "Full Glam",
      "Soft Glam",
      "Makeup Lesson"
    ]
  },

  {
    label: "More",
    icon: "✨",
    theme: "theme-default",
    services: [
      "Massage",
      "Photography",
      "Tattoo Session"
    ]
  }
];

/* =========================================================
   SERVICE CARD
========================================================= */

function serviceCard(service, index = 0) {
  const icons = ["✦", "◆", "★"];

  return `
    <article class="service-card">

      <div class="service-image">
        ${icons[index] || "✦"}
      </div>

      <div class="service-content">

        <h3>${service}</h3>

        <p class="text-muted">
          Book a local professional
        </p>

        <button
          type="button"
          class="btn btn-primary"
          onclick="location.hash='#/book'"
        >
          Book Now
        </button>

      </div>

    </article>
  `;
}

/* =========================================================
   CATEGORY BUTTON
========================================================= */

function categoryButton(category, index) {
  return `
    <button
      type="button"
      class="category ${
        index === 0 ? "active" : ""
      }"
      data-theme="${category.theme}"
      data-category="${index}"
    >

      <span class="category-icon">
        ${category.icon}
      </span>

      <span class="category-label">
        ${category.label}
      </span>

    </button>
  `;
}

/* =========================================================
   HOME
========================================================= */

function renderHome() {
  return layout(`

    <main class="container">

      <section class="hero">

        <div class="hero-copy">

          <p class="eyebrow">
            BOOKED
          </p>

          <h1>
            Welcome back.
          </h1>

          <p>
            What are you looking for today?
          </p>

          <div class="search">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search services, businesses..."
            />

          </div>

        </div>

      </section>


      <!-- CATEGORY SECTION -->

      <section class="section">

        <div class="section-heading">

          <div>

            <p class="eyebrow">
              DISCOVER
            </p>

            <h2>
              Browse Categories
            </h2>

          </div>

        </div>


        <div
          class="category-grid"
          id="category-menu"
        >

          ${categories
            .map((category, index) =>
              categoryButton(category, index)
            )
            .join("")}

        </div>

      </section>


      <!-- POPULAR SERVICES -->

      <section class="section">

        <div class="section-heading">

          <div>

            <p class="eyebrow">
              POPULAR
            </p>

            <h2 id="popular-title">
              Popular Hair & Beauty
            </h2>

          </div>

        </div>


        <div
          class="cards"
          id="popular-services"
        >

          ${categories[0].services
            .map((service, index) =>
              serviceCard(service, index)
            )
            .join("")}

        </div>

      </section>


      <!-- BOTTOM NAV -->

      <nav class="bottom-nav">

        <a
          class="nav-item active"
          href="#/home"
        >
          <span>⌂</span>
          <small>Home</small>
        </a>


        <a
          class="nav-item"
          href="#/search"
        >
          <span>⌕</span>
          <small>Search</small>
        </a>


        <a
          class="nav-item"
          href="#/bookings"
        >
          <span>✓</span>
          <small>Bookings</small>
        </a>

      </nav>

    </main>

  `);
}

/* =========================================================
   HOME INTERACTIONS
========================================================= */

function setupHomeInteractions() {
  const screen =
    document.querySelector(".screen");

  const buttons =
    document.querySelectorAll(
      "[data-category]"
    );

  const servicesContainer =
    document.querySelector(
      "#popular-services"
    );

  const title =
    document.querySelector(
      "#popular-title"
    );


  if (
    !screen ||
    !buttons.length ||
    !servicesContainer
  ) {
    return;
  }


  buttons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const categoryIndex =
          Number(
            button.dataset.category
          );

        const category =
          categories[categoryIndex];


        /* -----------------------------------------
           ACTIVE CATEGORY
        ----------------------------------------- */

        buttons.forEach((item) => {
          item.classList.remove(
            "active"
          );
        });

        button.classList.add(
          "active"
        );


        /* -----------------------------------------
           CHANGE COLOR THEME
        ----------------------------------------- */

        screen.className =
          `screen ${category.theme}`;


        /* -----------------------------------------
           CHANGE POPULAR SERVICES TITLE
        ----------------------------------------- */

        title.textContent =
          `Popular
