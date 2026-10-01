import { route, renderCurrent } from "./router.js";
import { getState, createUser, createAppointment } from "./state.js";

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
   LAYOUT
========================================================= */

function layout(content) {
  return `
    <div class="screen theme-default">

      <header class="topbar">
        <div class="container">
          ${brand()}
        </div>
      </header>

      ${content}

    </div>
  `;
}

/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  {
    label: "Hair & Beauty",
    icon: "✦",
    services: [
      "Women's Haircut",
      "Blowout",
      "Hair Color"
    ]
  },
  {
    label: "Fitness",
    icon: "✦",
    services: [
      "Personal Training",
      "Boxing",
      "Yoga Session"
    ]
  },
  {
    label: "Nails",
    icon: "✦",
    services: [
      "Gel Manicure",
      "Acrylic Set",
      "Nail Art"
    ]
  },
  {
    label: "Barbers",
    icon: "✦",
    services: [
      "Men's Haircut",
      "Beard Trim",
      "Skin Fade"
    ]
  },
  {
    label: "Makeup",
    icon: "✦",
    services: [
      "Full Glam",
      "Soft Glam",
      "Makeup Lesson"
    ]
  },
  {
    label: "More",
    icon: "✦",
    services: [
      "Massage",
      "Photography",
      "Tattoo Session"
    ]
  }
];

/* =========================================================
   CATEGORY CARD
========================================================= */

function categoryCard(category, index) {
  return `
    <button
      type="button"
      class="category ${index === 0 ? "active" : ""}"
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
   SERVICE CARD
========================================================= */

function serviceCard(service) {
  return `
    <article class="service-card">

      <div class="service-image">
        ✦
      </div>

      <div class="service-content">

        <h3>${service}</h3>

        <p class="text-muted">
          Book a local professional
        </p>

        <button
          type="button"
          class="btn btn-primary"
          data-book-service="${service}"
        >
          Book Now
        </button>

      </div>

    </article>
  `;
}

/* =========================================================
   HOME
========================================================= */

function renderHome() {
  const firstCategory = categories[0];

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
              id="home-search"
              type="text"
              placeholder="Search services, businesses..."
            />

          </div>

        </div>

      </section>

      <section class="section">

        <div class="section-heading">
          <div>
            <p class="eyebrow">DISCOVER</p>
            <h2>Browse Categories</h2>
          </div>
        </div>

        <div
          class="category-grid"
          id="category-menu"
        >
          ${categories
            .map(categoryCard)
            .join("")}
        </div>

      </section>

      <section class="section">

        <div class="section-heading">

          <div>
            <p class="eyebrow">POPULAR</p>

            <h2 id="popular-title">
              Popular ${firstCategory.label}
            </h2>
          </div>

        </div>

        <div
          class="cards"
          id="popular-services"
        >
          ${firstCategory.services
            .map(serviceCard)
            .join("")}
        </div>

      </section>

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

function setupHome() {

  const buttons =
    document.querySelectorAll("[data-category]");

  const title =
    document.querySelector("#popular-title");

  const services =
    document.querySelector("#popular-services");

  if (!buttons.length || !title || !services) {
    return;
  }

  buttons.forEach((button) => {

    button.addEventListener("click", () => {

      const index =
        Number(button.dataset.category);

      const category =
        categories[index];

      if (!category) {
        return;
      }

      buttons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      title.textContent =
        `Popular ${category.label}`;

      services.innerHTML =
        category.services
          .map(serviceCard)
          .join("");

      setupBookingButtons();

    });

  });

  setupBookingButtons();
}

/* =========================================================
   BOOKING BUTTONS
========================================================= */

function setupBookingButtons() {

  document
    .querySelectorAll("[data-book-service]")
    .forEach((button) => {

      button.addEventListener("click", () => {

        const service =
          button.dataset.bookService;

        sessionStorage.setItem(
          "booked_selected_service",
          service
        );

        location.hash = "#/book";

      });

    });

}

/* =========================================================
   SEARCH
========================================================= */

function renderSearch() {

  return layout(`

    <main class="container">

      <section class="section">

        <p class="eyebrow">
          BOOKED
        </p>

        <h1>
          Search
        </h1>

        <div class="search">

          <span>⌕</span>

          <input
            id="search-input"
            type="text"
            placeholder="Search services..."
          />

        </div>

        <div
          class="cards"
          id="search-results"
        ></div>

      </section>

      <nav class="bottom-nav">

        <a
          class="nav-item"
          href="#/home"
        >
          <span>⌂</span>
          <small>Home</small>
        </a>

        <a
          class="nav-item active"
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

function setupSearch() {

  const input =
    document.querySelector("#search-input");

  const results =
    document.querySelector("#search-results");

  if (!input || !results) {
    return;
  }

  const allServices =
    categories.flatMap((category) =>
      category.services
    );

  function search() {

    const query =
      input.value.trim().toLowerCase();

    const matches =
      query
        ? allServices.filter((service) =>
            service.toLowerCase().includes(query)
          )
        : allServices;

    results.innerHTML =
      matches.length
        ? matches.map(serviceCard).join("")
        : `
          <p class="text-muted">
            No services found.
          </p>
        `;

    setupBookingButtons();
  }

  input.addEventListener("input", search);

  search();
}

/* =========================================================
   BOOKINGS
========================================================= */

function renderBookings() {

  const state = getState();

  const appointments =
    state.appointments || [];

  return layout(`

    <main class="container">

      <section class="section">

        <p class="eyebrow">
          BOOKED
        </p>

        <h1>
          My Bookings
        </h1>

        ${
          appointments.length
            ? appointments.map((appointment) => `
                <article class="service-card">

                  <div class="service-content">

                    <h3>
                      ${appointment.service || "Appointment"}
                    </h3>

                    <p class="text-muted">
                      ${appointment.status || "Confirmed"}
                    </p>

                  </div>

                </article>
              `).join("")
            : `
              <p class="text-muted">
                You don't have any bookings yet.
              </p>
            `
        }

      </section>

      <nav class="bottom-nav">

        <a
          class="nav-item"
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
          class="nav-item active"
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
   BOOK
========================================================= */

function renderBook() {

  const service =
    sessionStorage.getItem(
      "booked_selected_service"
    ) || "Selected Service";

  return layout(`

    <main class="container">

      <section class="section">

        <p class="eyebrow">
          BOOKED
        </p>

        <h1>
          Book Your Appointment
        </h1>

        <article class="service-card">

          <div class="service-content">

            <h3>
              ${service}
            </h3>

            <p class="text-muted">
              Choose your appointment details.
            </p>

            <label>
              Your Name
              <input
                id="booking-name"
                type="text"
                placeholder="Your name"
              />
            </label>

            <br>

            <label>
              Email
              <input
                id="booking-email"
                type="email"
                placeholder="you@example.com"
              />
            </label>

            <br>

            <button
              type="button"
              class="btn btn-primary"
              id="confirm-booking"
            >
              Confirm Booking
            </
