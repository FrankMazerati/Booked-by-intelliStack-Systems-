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
          data-book-service="${service}"
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
      class="category ${index === 0 ? "active" : ""}"
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
              id="home-search"
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
          href="#/"
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
    !servicesContainer ||
    !title
  ) {
    return;
  }

  buttons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const categoryIndex =
          Number(button.dataset.category);

        const category =
          categories[categoryIndex];

        if (!category) {
          return;
        }

        /* ACTIVE CATEGORY */

        buttons.forEach((item) => {
          item.classList.remove("active");
        });

        button.classList.add("active");

        /* CHANGE COLOR THEME */

        screen.className =
          `screen ${category.theme}`;

        /* CHANGE TITLE */

        title.textContent =
          `Popular ${category.label}`;

        /* CHANGE SERVICES */

        servicesContainer.innerHTML =
          category.services
            .map((service, index) =>
              serviceCard(service, index)
            )
            .join("");

        setupBookingButtons();
      }
    );

  });
}

/* =========================================================
   BOOKING BUTTONS
========================================================= */

function setupBookingButtons() {
  const buttons =
    document.querySelectorAll(
      "[data-book-service]"
    );

  buttons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const service =
          button.dataset.bookService;

        sessionStorage.setItem(
          "booked_selected_service",
          service
        );

        navigate("/book");
      }
    );

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
          SEARCH
        </p>

        <h1>
          Find a service
        </h1>

        <div class="search">

          <span>⌕</span>

          <input
            id="search-input"
            type="text"
            placeholder="Search BOOKED..."
            autofocus
          />

        </div>

        <div
          id="search-results"
          class="cards"
          style="margin-top:24px;"
        ></div>

      </section>

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

  function search(value) {

    const query =
      value.trim().toLowerCase();

    if (!query) {
      results.innerHTML = `
        <p class="text-muted">
          Start typing to search BOOKED services.
        </p>
      `;
      return;
    }

    const matches = [];

    categories.forEach((category) => {

      category.services.forEach((service) => {

        if (
          service.toLowerCase().includes(query) ||
          category.label.toLowerCase().includes(query)
        ) {
          matches.push({
            service,
            category
          });
        }

      });

    });

    if (!matches.length) {
      results.innerHTML = `
        <p class="text-muted">
          No services found.
        </p>
      `;
      return;
    }

    results.innerHTML =
      matches
        .map((item, index) =>
          serviceCard(
            item.service,
            index % 3
          )
        )
        .join("");

    setupBookingButtons();
  }

  input.addEventListener(
    "input",
    () => search(input.value)
  );

  search("");
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
          Your Bookings
        </h1>

        ${
          appointments.length
            ? `
              <div class="cards">
                ${appointments
                  .map(
                    (appointment) => `
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
                    `
                  )
                  .join("")}
              </div>
            `
            : `
              <p class="text-muted">
                You don't have any bookings yet.
              </p>
            `
        }

      </section>

    </main>

  `);
}

/* =========================================================
   BOOK SCREEN
========================================================= */

function renderBook() {
  const selectedService =
    sessionStorage.getItem(
      "booked_selected_service"
    ) || "Service";

  return layout(`

    <main class="container">

      <section class="section">

        <p class="eyebrow">
          BOOK
        </p>

        <h1>
          Confirm your booking
        </h1>

        <article class="service-card">

          <div class="service-content">

            <h2>
              ${selectedService}
            </h2>

            <p class="text-muted">
              Choose your appointment details.
            </p>

            <label>
              Your name
              <input
                id="booking-name"
                type="text"
                placeholder="Your name"
              />
            </label>

            <br />

            <label>
              Email
              <input
                id="booking-email"
                type="email"
                placeholder="you@example.com"
              />
            </label>

            <br />

            <button
              type="button"
              class="btn btn-primary"
              id="confirm-booking"
            >
              Confirm Booking
            </button>

          </div>

        </article>

      </section>

    </main>

  `);
}

function setupBook() {
  const button =
    document.querySelector(
      "#confirm-booking"
    );

  if (!button) {
    return;
  }

  button.addEventListener(
    "click",
    () => {

      const name =
        document.querySelector(
          "#booking-name"
        )?.value.trim();

      const email =
        document.querySelector(
          "#booking-email"
        )?.value.trim();

      const service =
        sessionStorage.getItem(
          "booked_selected_service"
        ) || "Service";

      if (!name || !email) {
        alert(
          "Please enter your name and email."
        );
        return;
      }

      createUser({
        name,
        email
      });

      const state =
        getState();

      state.appointments.unshift({
        id:
          crypto.randomUUID(),
        service,
        status:
          "Confirmed",
        createdAt:
          new Date().toISOString()
      });

      localStorage.setItem(
        "booked_demo_state",
        JSON.stringify(state)
      );

      sessionStorage.removeItem(
        "booked_selected_service"
      );

      navigate("/bookings");
    }
  );
}

/* =========================================================
   ROUTES
========================================================= */

route("/", () => {
  document.querySelector("#app").innerHTML =
    renderHome();

  setupHomeInteractions();
  setupBookingButtons();
});

route("/home", () => {
  document.querySelector("#app").innerHTML =
    renderHome();

  setupHomeInteractions();
  setupBookingButtons();
});

route("/search", () => {
  document.querySelector("#app").innerHTML =
    renderSearch();

  setupSearch();
});

route("/bookings", () => {
  document.querySelector("#app").innerHTML =
    renderBookings();
});

route("/book", () => {
  document.querySelector("#app").innerHTML =
    renderBook();

  setupBook();
});

/* =========================================================
   START BOOKED
========================================================= */

renderCurrent();
