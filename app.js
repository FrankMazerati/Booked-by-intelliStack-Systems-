import { route, navigate, renderCurrent } from "./router.js";
import { getState, createUser } from "./state.js";

const app = document.querySelector("#app");

/* =========================================================
   BRAND
   ========================================================= */

const brand = () => `
  <div class="brand">
    <span class="brand-mark">✓</span>
    <span>BOOKED</span>
  </div>
`;

/* =========================================================
   LAYOUT
   ========================================================= */

function layout(content, topbar = true, theme = "theme-default") {
  return `
    <div class="screen ${theme}">
      ${
        topbar
          ? `
            <header class="topbar">
              ${brand()}
              <button class="btn btn-outline" data-nav="/signup">
                Sign Up
              </button>
            </header>
          `
          : ""
      }

      ${content}
    </div>
  `;
}

/* =========================================================
   LANDING PAGE
   ========================================================= */

route("/", async () => {
  const state = getState();

  if (state.user) {
    return navigate("/home");
  }

  app.innerHTML = layout(
    `
      <main class="hero">
        <div class="hero-grid">

          <!-- LEFT SIDE / REFERENCE EXPERIENCE -->

          <section class="hero-copy welcome">

            <div style="
              position:relative;
              z-index:2;
              display:flex;
              flex-direction:column;
              min-height:620px;
              justify-content:space-between;
              padding:28px;
            ">

              <div>
                ${brand()}

                <div style="
                  margin-top:55px;
                  max-width:560px;
                ">
                  <h1>
                    Your time,
                    <br>
                    <span class="script">booked.</span>
                  </h1>

                  <p>
                    Discover the people and places that help you feel your best.
                    Find services, book appointments, and keep everything in one place.
                  </p>

                  <div class="actions">
                    <button class="btn btn-primary" data-nav="/login">
                      Log In →
                    </button>

                    <button class="btn btn-outline" data-nav="/signup">
                      Create Account
                    </button>
                  </div>
                </div>
              </div>

              <div style="
                display:grid;
                grid-template-columns:repeat(3,1fr);
                gap:12px;
                max-width:560px;
                margin-top:40px;
              ">

                <div style="text-align:center">
                  <div style="
                    font-size:28px;
                    color:var(--booked-pink);
                    text-shadow:0 0 18px var(--booked-purple-glow);
                  ">
                    ⚡
                  </div>
                  <strong>Find Services</strong>
                </div>

                <div style="text-align:center">
                  <div style="
                    font-size:28px;
                    color:var(--booked-cyan);
                    text-shadow:0 0 18px var(--booked-cyan-glow);
                  ">
                    ▣
                  </div>
                  <strong>Book Appointments</strong>
                </div>

                <div style="text-align:center">
                  <div style="
                    font-size:28px;
                    color:var(--booked-purple);
                    text-shadow:0 0 18px var(--booked-purple-glow);
                  ">
                    ♡
                  </div>
                  <strong>Live Better</strong>
                </div>

              </div>

            </div>

          </section>


          <!-- RIGHT SIDE / REAL INTERACTIVE LOGIN CARD -->

          <section class="glass auth-card">

            <div style="
              text-align:center;
              margin-bottom:22px;
            ">
              <div style="
                display:inline-grid;
                place-items:center;
                width:58px;
                height:58px;
                border-radius:16px;
                background:linear-gradient(
                  135deg,
                  var(--booked-cyan),
                  var(--booked-purple)
                );
                font-size:32px;
                font-weight:900;
                box-shadow:
                  0 0 24px var(--booked-cyan-glow),
                  0 0 35px var(--booked-purple-glow);
              ">
                ✓
              </div>

              <h2 style="margin-top:18px">
                BOOKED
              </h2>

              <div style="
                color:var(--muted);
                letter-spacing:.28em;
                font-size:11px;
                font-weight:800;
              ">
                WELCOME BACK
              </div>
            </div>


            <h2 style="font-size:30px">
              Log in to your account
            </h2>

            <p class="text-muted">
              Access your bookings, manage your appointments, and more.
            </p>


            <form id="landingLoginForm">

              <div class="form-group">
                <label class="label">
                  Email or phone number
                </label>

                <input
                  name="email"
                  class="input"
                  required
                  placeholder="you@example.com"
                >
              </div>


              <div class="form-group">
                <label class="label">
                  Password
                </label>

                <input
                  name="password"
                  class="input"
                  required
                  type="password"
                  placeholder="••••••••"
                >
              </div>


              <div style="
                text-align:right;
                margin:8px 0 18px;
              ">
                <span style="
                  color:var(--booked-cyan);
                  font-size:14px;
                ">
                  Forgot password?
                </span>
              </div>


              <button
                class="btn btn-primary btn-block"
                type="submit"
              >
                Log In →
              </button>

            </form>


            <div class="divider">
              OR
            </div>


            <div class="socials">

              <button class="btn social">
                🌈 Continue with Google
              </button>

              <button class="btn social">
                 Continue with Apple
              </button>

              <button class="btn social">
                f&nbsp; Continue with Facebook
              </button>

            </div>


            <p
              class="text-muted"
              style="text-align:center;margin-top:20px"
            >
              Don't have an account?

              <button
                class="btn"
                data-nav="/signup"
                style="
                  padding:5px 8px;
                  color:var(--booked-cyan);
                "
              >
                Sign Up
              </button>
            </p>

          </section>

        </div>
      </main>
    `,
    false,
    "theme-default"
  );

  bindNavigation();

  document
    .querySelector("#landingLoginForm")
    .addEventListener("submit", e => {
      e.preventDefault();

      const email = e.target
        .querySelector('[name="email"]')
        .value;

      createUser({
        name: email.split("@")[0] || "BOOKED Member",
        email
      });

      navigate("/home");
    });
});


/* =========================================================
   LOGIN
   ========================================================= */

route("/login", async () => {
  app.innerHTML = layout(`
    <main class="hero">
      <div
        class="glass auth-card"
        style="width:min(500px,100%);margin:auto"
      >

        ${brand()}

        <h2>
          Welcome
          <span class="gradient-text">back.</span>
        </h2>

        <p class="text-muted">
          Log in to manage your bookings and appointments.
        </p>


        <form id="loginForm">

          <div class="form-group">
            <label class="label">
              Email or phone number
            </label>

            <input
              name="email"
              class="input"
              required
              placeholder="you@example.com"
            >
          </div>


          <div class="form-group">
            <label class="label">
              Password
            </label>

            <input
              name="password"
              class="input"
              required
              type="password"
              placeholder="••••••••"
            >
          </div>


          <button
            class="btn btn-primary btn-block"
            type="submit"
          >
            Log In →
          </button>

        </form>


        <div class="divider">
          OR
        </div>


        <div class="socials">

          <button class="btn social">
            🌈 Continue with Google
          </button>

          <button class="btn social">
             Continue with Apple
          </button>

          <button class="btn social">
            f&nbsp; Continue with Facebook
          </button>

        </div>


        <p
          class="text-muted"
          style="text-align:center;margin-top:20px"
        >
          New to BOOKED?

          <button
            class="btn"
            data-nav="/signup"
            style="
              padding:5px 8px;
              color:var(--booked-cyan)
            "
          >
            Create an account
          </button>
        </p>

      </div>
    </main>
  `);

  bindNavigation();

  document
    .querySelector("#loginForm")
    .addEventListener("submit", e => {
      e.preventDefault();

      const email = e.target
        .querySelector('[name="email"]')
        .value;

      createUser({
        name: email.split("@")[0] || "BOOKED Member",
        email
      });

      navigate("/home");
    });
});


/* =========================================================
   SIGN UP
   ========================================================= */

route("/signup", async () => {
  app.innerHTML = layout(`
    <main class="hero">

      <div
        class="glass auth-card"
        style="width:min(500px,100%);margin:auto"
      >

        ${brand()}

        <h2>
          Create Your
          <span class="gradient-text">Account</span>
        </h2>

        <p class="text-muted">
          Get started in just a few steps.
        </p>


        <div class="socials">

          <button class="btn social">
            🌈 Continue with Google
          </button>

          <button class="btn social">
             Continue with Apple
          </button>

          <button class="btn social">
            f&nbsp; Continue with Facebook
          </button>

        </div>


        <div class="divider">
          OR
        </div>


        <form id="signupForm">

          <div class="form-group">
            <label class="label">
              Full Name
            </label>

            <input
              name="name"
              class="input"
              required
              placeholder="Your name"
            >
          </div>


          <div class="form-group">
            <label class="label">
              Email Address
            </label>

            <input
              name="email"
              class="input"
              type="email"
              required
              placeholder="you@example.com"
            >
          </div>


          <div class="form-group">
            <label class="label">
              Password
            </label>

            <input
              name="password"
              class="input"
              type="password"
              required
              minlength="6"
              placeholder="Create a password"
            >
          </div>


          <button
            class="btn btn-primary btn-block"
            type="submit"
          >
            Create Account →
          </button>

        </form>


        <p
          class="text-muted"
          style="text-align:center;margin-top:18px"
        >
          Already have an account?

          <button
            class="btn"
            data-nav="/login"
            style="
              padding:5px 8px;
              color:var(--booked-cyan)
            "
          >
            Log In
          </button>
        </p>

      </div>

    </main>
  `);

  bindNavigation();

  document
    .querySelector("#signupForm")
    .addEventListener("submit", e => {
      e.preventDefault();

      const data = new FormData(e.target);

      createUser({
        name: data.get("name"),
        email: data.get("email")
      });

      navigate("/home");
    });
});


/* =========================================================
   HOME
   ========================================================= */

route("/home", async () => {
  const state = getState();
  const name = state.user?.name || "Member";

  const categories = [
    { label: "💇 Hair & Beauty", theme: "theme-beauty" },
    { label: "💪 Fitness", theme: "theme-fitness" },
    { label: "💅 Nails", theme: "theme-beauty" },
    { label: "💈 Barbers", theme: "theme-barbers" },
    { label: "💄 Makeup", theme: "theme-beauty" },
    { label: "✨ More", theme: "theme-default" }
  ];

  app.innerHTML = layout(`
    <div class="container home-main">

      <header class="home-header">

        ${brand()}

        <div class="welcome">

          <p class="text-muted">
            Good morning 👑
          </p>

          <h1>
            Welcome, ${name.split(" ")[0]}.
          </h1>

          <p class="text-muted">
            What are you looking for today?
          </p>

        </div>

      </header>


      <div class="search">

        <span>⌕</span>

        <input
          id="homeSearch"
          placeholder="Search services, businesses..."
        >

        <button
          class="btn btn-primary"
          id="searchBtn"
        >
          Search
        </button>

      </div>


      <div class="category-row">

        ${categories
          .map(
            category => `
              <button
                class="category"
                data-theme="${category.theme}"
              >
                ${category.label}
              </button>
            `
          )
          .join("")}

      </div>


      <div class="section-head">

        <h2>
          Popular Services
        </h2>

        <span
          style="
            color:var(--category-accent);
            cursor:pointer;
          "
          data-nav="/search"
        >
          See All →
        </span>

      </div>


      <div class="cards">

        ${[
          ["Hair", "$45", "Women's Haircut", "45 min"],
          ["Nails", "$55", "Gel Manicure", "60 min"],
          ["Massage", "$80", "Relaxation Massage", "60 min"]
        ]
          .map(
            ([cat, price, title, time]) => `
              <article class="service-card">

                <div class="service-image"></div>

                <small
                  style="color:var(--category-accent)"
                >
                  ${cat}
                </small>

                <h3>
                  ${title}
                </h3>

                <p class="text-muted">
                  ${time} ·
                  <strong style="color:#fff">
                    ${price}
                  </strong>
                </p>

                <button
                  class="btn btn-primary btn-block"
                  data-nav="/search"
                >
                  Find Providers →
                </button>

              </article>
            `
          )
          .join("")}

      </div>

    </div>


    <nav class="bottom-nav">

      <button
        class="nav-item active"
        data-nav="/home"
      >
        ⌂<br>
        <small>Home</small>
      </button>

      <button
        class="nav-item"
        data-nav="/search"
      >
        ⌕<br>
        <small>Explore</small>
      </button>

      <button
        class="nav-item"
        data-nav="/bookings"
      >
        ▣<br>
        <small>Bookings</small>
      </button>

      <button class="nav-item">
        ♙<br>
        <small>Profile</small>
      </button>

    </nav>
  `);

  bindNavigation();

  document
    .querySelector("#searchBtn")
    .onclick = () => navigate("/search");


  /* Category theme switching */

  document
    .querySelectorAll("[data-theme]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const theme =
          button.dataset.theme || "theme-default";

        const screen =
          document.querySelector(".screen");

        screen.classList.remove(
          "theme-default",
          "theme-barbers",
          "theme-beauty",
          "theme-restaurants",
          "theme-fitness",
          "theme-entertainment",
          "theme-wellness",
          "theme-animal"
        );

        screen.classList.add(theme);

        document
          .querySelectorAll(".category")
          .forEach(item => {
            item.classList.remove("selected");
          });

        button.classList.add("selected");
      });

    });
});


/* =========================================================
   SEARCH
   ========================================================= */

route("/search", async () => {

  const businesses = [
    [
      "The Luxe Hair Studio",
      "$45",
      "Haircuts · Color · Styling"
    ],
    [
      "Kings & Fades Barbershop",
      "$35",
      "Haircuts · Beard Trim · Shaves"
    ],
    [
      "Glow Beauty & Spa",
      "$60",
      "Facials · Waxing · Skin Treatments"
    ]
  ];

  app.innerHTML = layout(`
    <div class="container home-main">

      <div class="home-header">
        ${brand()}
      </div>

      <h1>
        Find a Service
      </h1>

      <div class="search">

        <span>⌕</span>

        <input
          id="searchInput"
          value="Hair"
          placeholder="Search services..."
        >

      </div>

      <p class="text-muted">
        Brooklyn, NY · 3 results
      </p>


      <div class="cards">

        ${businesses
          .map(
            (b, i) => `
              <article class="service-card">

                <div class="service-image"></div>

                <small
                  style="color:var(--category-accent)"
                >
                  ★ ${i === 0 ? "Top Rated" : "Popular"}
                </small>

                <h2>
                  ${b[0]}
                </h2>

                <p class="text-muted">
                  ${b[2]}
                </p>

                <p>
                  Starting at
                  <strong>
                    ${b[1]}
                  </strong>
                </p>

                <button
                  class="btn btn-primary btn-block"
                  data-nav="/business"
                >
                  View Business →
                </button>

              </article>
            `
          )
          .join("")}

      </div>

    </div>


    <nav class="bottom-nav">

      <button
        class="nav-item"
        data-nav="/home"
      >
        ⌂<br>
        <small>Home</small>
      </button>

      <button
        class="nav-item active"
        data-nav="/search"
      >
        ⌕<br>
        <small>Explore</small>
      </button>

      <button
        class="nav-item"
        data-nav="/bookings"
      >
        ▣<br>
        <small>Bookings</small>
      </button>

      <button class="nav-item">
        ♙<br>
        <small>Profile</small>
      </button>

    </nav>
  `);

  bindNavigation();
});


/* =========================================================
   BUSINESS
   ========================================================= */

route("/business", async () => {

  app.innerHTML = layout(`
    <div class="container home-main">

      <div class="home-header">
        ${brand()}
      </div>


      <div class="glass auth-card">

        <div
          class="service-image"
          style="height:240px"
        ></div>


        <small
          style="color:var(--category-accent)"
        >
          ★ 4.8 · 312 reviews
        </small>


        <h1>
          The Luxe Hair Studio
        </h1>


        <p class="text-muted">
          Brooklyn, NY · Luxury hair care in a modern,
          stylish environment.
        </p>


        <div class="section-head">
          <h2>
            Services & Pricing
          </h2>
        </div>


        ${[
          ["Women's Haircut", "$45", "45 min"],
          ["Color (Single Process)", "$85", "1 hr 30 min"],
          ["Balayage", "$150", "2 hr"]
        ]
          .map(
            s => `
              <div
                class="service-card"
                style="
                  display:flex;
                  justify-content:space-between;
                  align-items:center;
                  margin:10px 0
                "
              >

                <div>

                  <strong>
                    ${s[0]}
                  </strong>

                  <div class="text-muted">
                    ${s[2]} · ${s[1]}
                  </div>

                </div>

                <button
                  class="btn btn-primary"
                  data-nav="/book"
                >
                  Book
                </button>

              </div>
            `
          )
          .join("")}

      </div>

    </div>
  `);

  bindNavigation();
});


/* =========================================================
   BOOKING
   ========================================================= */

route("/book", async () => {

  app.innerHTML = layout(`
    <div class="container home-main">

      <div class="home-header">
        ${brand()}
      </div>


      <div class="glass auth-card">

        <small
          style="color:var(--category-accent)"
        >
          BOOKING
        </small>


        <h1>
          Women's Haircut
        </h1>


        <p class="text-muted">
          The Luxe Hair Studio · $45 · 45 min
        </p>


        <div class="section-head">
          <h2>
            Choose a Date
          </h2>
        </div>


        <div class="category-row">

          ${[
            "Wed Apr 22",
            "Thu Apr 23",
            "Fri Apr 24",
            "Sat Apr 25"
          ]
            .map(
              d => `
                <button
                  class="category"
                  data-date="${d}"
                >
                  ${d}
                </button>
              `
            )
            .join("")}

        </div>


        <div class="section-head">
          <h2>
            Available Times
          </h2>
        </div>


        <div class="category-row">

          ${[
            "9:00 AM",
            "10:00 AM",
            "11:00 AM",
            "12:00 PM",
            "1:00 PM",
            "2:30 PM",
            "4:00 PM",
            "5:30 PM"
          ]
            .map(
              t => `
                <button
                  class="category"
                  data-time="${t}"
                >
                  ${t}
                </button>
              `
            )
            .join("")}

        </div>


        <button
          class="btn btn-primary btn-block"
          id="confirmBooking"
          style="margin-top:25px"
        >
          Continue →
        </button>

      </div>

    </div>
  `);

  bindNavigation();

  let date = "Wed Apr 22";
  let time = "2:30 PM";


  document
    .querySelectorAll("[data-date]")
    .forEach(button => {
      button.onclick = () => {
        date = button.dataset.date;
      };
    });


  document
    .querySelectorAll("[data-time]")
    .forEach(button => {
      button.onclick = () => {
        time = button.dataset.time;
      };
    });


  document
    .querySelector("#confirmBooking")
    .onclick = () => {

      window.__pendingBooking = {
        business: "The Luxe Hair Studio",
        service: "Women's Haircut",
        price: 45,
        date,
        time
      };

      navigate("/confirmation");
    };
});


/* =========================================================
   CONFIRMATION
   ========================================================= */

route("/confirmation", async () => {

  const b =
    window.__pendingBooking || {
      business: "The Luxe Hair Studio",
      service: "Women's Haircut",
      price: 45,
      date: "Wed Apr 22",
      time: "2:30 PM"
    };


  app.innerHTML = layout(`
    <main class="hero">

      <div
        class="glass auth-card"
        style="
          width:min(620px,100%);
          margin:auto;
          text-align:center
        "
      >

        <div style="font-size:64px">
          ✓
        </div>


        <h1>
          You're
          <span class="gradient-text">
            Booked!
          </span>
        </h1>


        <p class="text-muted">
          Your appointment has been confirmed.
        </p>


        <div
          class="service-card"
          style="
            text-align:left;
            margin:24px 0
          "
        >

          <h2>
            ${b.business}
          </h2>

          <p>
            ${b.service} · $${b.price}
          </p>

          <p class="text-muted">
            ${b.date} · ${b.time}
          </p>

        </div>


        <button
          class="btn btn-primary btn-block"
          id="saveBooking"
        >
          View My Bookings
        </button>

      </div>

    </main>
  `);


  document
    .querySelector("#saveBooking")
    .onclick = () => {

      import("./state.js").then(
        ({ createAppointment }) => {

          createAppointment(b);

          navigate("/bookings");

        }
      );

    };
});


/* =========================================================
   BOOKINGS
   ========================================================= */

route("/bookings", async () => {

  const state = getState();


  app.innerHTML = layout(`
    <div class="container home-main">

      <div class="home-header">
        ${brand()}
      </div>


      <h1>
        My Bookings
      </h1>


      <div class="category-row">

        <button class="btn btn-primary">
          Upcoming
        </button>

        <button class="btn">
          Past
        </button>

      </div>


      ${
        state.appointments.length
          ? state.appointments
              .map(
                a => `
                  <article
                    class="service-card"
                    style="margin:14px 0"
                  >

                    <small
                      style="color:var(--success)"
                    >
                      ● ${a.status}
                    </small>

                    <h2>
                      ${a.business}
                    </h2>

                    <p>
                      ${a.service} · $${a.price}
                    </p>

                    <p class="text-muted">
                      ${a.date} · ${a.time}
                    </p>

                    <button class="btn">
                      Reschedule
                    </button>

                    <button class="btn">
                      Cancel
                    </button>

                  </article>
                `
              )
              .join("")
          : `
              <div class="glass auth-card">

                <h2>
                  No bookings yet
                </h2>

                <p class="text-muted">
                  Your confirmed appointments will appear here.
                </p>

                <button
                  class="btn btn-primary"
                  data-nav="/search"
                >
                  Find a Service →
                </button>

              </div>
            `
      }

    </div>


    <nav class="bottom-nav">

      <button
        class="nav-item"
        data-nav="/home"
      >
        ⌂<br>
        <small>Home</small>
      </button>

      <button
        class="nav-item"
        data-nav="/search"
      >
        ⌕<br>
        <small>Explore</small>
      </button>

      <button
        class="nav-item active"
        data-nav="/bookings"
      >
        ▣<br>
        <small>Bookings</small>
      </button>

      <button class="nav-item">
        ♙<br>
        <small>Profile</small>
      </button>

    </nav>
  `);

  bindNavigation();
});


/* =========================================================
   NAVIGATION
   ========================================================= */

function bindNavigation() {

  document
    .querySelectorAll("[data-nav]")
    .forEach(el => {

      el.addEventListener("click", () => {
        navigate(el.dataset.nav);
      });

    });

}


/* =========================================================
   START APPLICATION
   ========================================================= */

renderCurrent();
