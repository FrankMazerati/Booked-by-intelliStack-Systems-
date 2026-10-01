import { route, navigate, renderCurrent } from "./router.js";
import { getState, createUser } from "./state.js";

/* =========================
   BRAND
========================= */

function brand() {
  return `
    <a class="brand" href="#/">
      <span class="brand-mark">B</span>
      <span>BOOKED</span>
    </a>
  `;
}

/* =========================
   LAYOUT
========================= */

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

/* =========================
   CATEGORY DATA
========================= */
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

      <section class="section">

        <div class="section-heading">
          <div>
            <p class="eyebrow">DISCOVER</p>
            <h2>Browse Categories</h2>
          </div>
        </div>

        <div class="category-grid" id="category-menu">
          ${categories
            .map(
              (category, index) => `
                <button
                  type="button"
                  class="category ${index === 0 ? "active" : ""}"
                  data-theme="${category.theme}"
                  data-category="${index}"
                >
                  ${category.label}
                </button>
              `
            )
            .join("")}
        </div>

      </section>

      <section class="section">

        <div class="section-heading">
          <div>
            <p class="eyebrow">POPULAR</p>
            <h2 id="popular-title">Popular Services</h2>
          </div>
        </div>

        <div class="cards" id="popular-services">
          ${categories[0].services
            .map((service, index) => serviceCard(service, index))
            .join("")}
        </div>

      </section>

      <nav class="bottom-nav">

        <a class="nav-item active" href="#/home">
          <span>⌂</span>
          <small>Home</small>
        </a>

        <a class="nav-item" href="#/search">
          <span>⌕</span>
          <small>Search</small>
        </a>

        <a class="nav-item" href="#/bookings">
          <span>✓</span>
          <small>Bookings</small>
        </a>

      </nav>

    </main>
  `);
}

/* =========================
   CATEGORY INTERACTION
========================= */

function setupHomeInteractions() {
  const screen = document.querySelector(".screen");
  const buttons = document.querySelectorAll("[data-category]");
  const servicesContainer =
    document.querySelector("#popular-services");

  const title =
    document.querySelector("#popular-title");

  if (!screen || !buttons.length || !servicesContainer) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {

      const categoryIndex =
        Number(button.dataset.category);

      const category =
        categories[categoryIndex];

      /* Change active button */
      buttons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      /* Change screen theme */
      screen.className =
        `screen ${category.theme}`;
