import { route, navigate, renderCurrent } from "./router.js";
import { getState, createUser } from "./state.js";

const app = document.querySelector("#app");

const brand = () => `
  <div class="brand">
    <span class="brand-mark">✓</span>
    <span>BOOKED</span>
  </div>`;

function layout(content, topbar = true) {
  return `<div class="screen">
    ${topbar ? `<header class="topbar">${brand()}<button class="btn btn-outline" data-nav="/signup">Sign Up</button></header>` : ""}
    ${content}
  </div>`;
}

route("/", async () => {
  const state = getState();
  if (state.user) return navigate("/home");

  app.innerHTML = layout(`
    <main class="hero">
      <div class="hero-grid">
        <section class="hero-copy">
          <div class="brand" style="margin-bottom:24px">${brand()}</div>
          <h1>Your time,<br><span class="script">booked.</span></h1>
          <p>Discover the people and places that help you feel your best. Find services, book appointments, and keep everything in one place.</p>
          <div class="actions">
            <button class="btn btn-primary" data-nav="/login">Log In →</button>
            <button class="btn btn-outline" data-nav="/signup">Create Account</button>
          </div>
        </section>
        <section class="glass auth-card">
          <div style="color:var(--yellow);font-weight:800;letter-spacing:.12em;font-size:12px">WELCOME TO BOOKED</div>
          <h2>Real people.<br><span class="gradient-text">Real services.</span></h2>
          <p class="text-muted">Real time.</p>
          <div class="divider">GET STARTED</div>
          <button class="btn btn-primary btn-block" data-nav="/signup">Create Your Account →</button>
          <button class="btn btn-block" style="margin-top:10px" data-nav="/login">I already have an account</button>
        </section>
      </div>
    </main>
  `);
  bindNavigation();
});

route("/login", async () => {
  app.innerHTML = layout(`
    <main class="hero">
      <div class="glass auth-card" style="width:min(500px,100%);margin:auto">
        <div class="brand">${brand()}</div>
        <h2>Welcome <span class="gradient-text">back.</span></h2>
        <p class="text-muted">Log in to manage your bookings and appointments.</p>
        <form id="loginForm">
          <div class="form-group"><label class="label">Email or phone number</label><input class="input" required placeholder="you@example.com"></div>
          <div class="form-group"><label class="label">Password</label><input class="input" required type="password" placeholder="••••••••"></div>
          <button class="btn btn-primary btn-block" type="submit">Log In →</button>
        </form>
        <div class="divider">OR</div>
        <div class="socials">
          <button class="btn social">🌈 Continue with Google</button>
          <button class="btn social"> Continue with Apple</button>
          <button class="btn social">f&nbsp; Continue with Facebook</button>
        </div>
        <p class="text-muted" style="text-align:center;margin-top:20px">New to BOOKED? <button class="btn" data-nav="/signup" style="padding:5px 8px;color:var(--yellow)">Create an account</button></p>
      </div>
    </main>
  `);
  bindNavigation();
  document.querySelector("#loginForm").addEventListener("submit", e => {
    e.preventDefault();
    const email = e.target.querySelector("input").value;
    createUser({ name: email.split("@")[0] || "BOOKED Member", email });
    navigate("/home");
  });
});

route("/signup", async () => {
  app.innerHTML = layout(`
    <main class="hero">
      <div class="glass auth-card" style="width:min(500px,100%);margin:auto">
        <div class="brand">${brand()}</div>
        <h2>Create Your <span class="gradient-text">Account</span></h2>
        <p class="text-muted">Get started in just a few steps.</p>
        <div class="socials">
          <button class="btn social">🌈 Continue with Google</button>
          <button class="btn social"> Continue with Apple</button>
          <button class="btn social">f&nbsp; Continue with Facebook</button>
        </div>
        <div class="divider">OR</div>
        <form id="signupForm">
          <div class="form-group"><label class="label">Full Name</label><input name="name" class="input" required placeholder="Your name"></div>
          <div class="form-group"><label class="label">Email Address</label><input name="email" class="input" type="email" required placeholder="you@example.com"></div>
          <div class="form-group"><label class="label">Password</label><input name="password" class="input" type="password" required minlength="6" placeholder="Create a password"></div>
          <button class="btn btn-primary btn-block" type="submit">Create Account →</button>
        </form>
        <p class="text-muted" style="text-align:center;margin-top:18px">Already have an account? <button class="btn" data-nav="/login" style="padding:5px 8px;color:var(--yellow)">Log In</button></p>
      </div>
    </main>
  `);
  bindNavigation();
  document.querySelector("#signupForm").addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(e.target);
    createUser({ name:data.get("name"), email:data.get("email") });
    navigate("/home");
  });
});

route("/home", async () => {
  const state = getState();
  const name = state.user?.name || "Member";
  app.innerHTML = layout(`
    <div class="container home-main">
      <header class="home-header">
        ${brand()}
        <div class="welcome">
          <p class="text-muted">Good morning 👑</p>
          <h1>Welcome, ${name.split(" ")[0]}.</h1>
          <p class="text-muted">What are you looking for today?</p>
        </div>
      </header>
      <div class="search">
        <span>⌕</span><input id="homeSearch" placeholder="Search services, businesses...">
        <button class="btn btn-primary" id="searchBtn">Search</button>
      </div>
      <div class="category-row">
        ${["💇 Hair & Beauty","💪 Fitness","💅 Nails","💈 Barbers","💄 Makeup","✨ More"].map(x=>`<button class="category">${x}</button>`).join("")}
      </div>
      <div class="section-head"><h2>Popular Services</h2><span style="color:var(--pink)">See All →</span></div>
      <div class="cards">
        ${[
          ["Hair","$45","Women's Haircut","45 min"],
          ["Nails","$55","Gel Manicure","60 min"],
          ["Massage","$80","Relaxation Massage","60 min"]
        ].map(([cat,price,title,time])=>`
          <article class="service-card">
            <div class="service-image"></div>
            <small style="color:var(--cyan)">${cat}</small>
            <h3>${title}</h3>
            <p class="text-muted">${time} · <strong style="color:#fff">${price}</strong></p>
            <button class="btn btn-primary btn-block" data-nav="/search">Find Providers →</button>
          </article>`).join("")}
      </div>
    </div>
    <nav class="bottom-nav">
      <button class="nav-item active" data-nav="/home">⌂<br><small>Home</small></button>
      <button class="nav-item" data-nav="/search">⌕<br><small>Explore</small></button>
      <button class="nav-item">▣<br><small>Bookings</small></button>
      <button class="nav-item">♙<br><small>Profile</small></button>
    </nav>
  `);
  bindNavigation();
  document.querySelector("#searchBtn").onclick = () => navigate("/search");
});

route("/search", async () => {
  const businesses = [
    ["The Luxe Hair Studio","$45","Haircuts · Color · Styling"],
    ["Kings & Fades Barbershop","$35","Haircuts · Beard Trim · Shaves"],
    ["Glow Beauty & Spa","$60","Facials · Waxing · Skin Treatments"]
  ];
  app.innerHTML = layout(`
    <div class="container home-main">
      <div class="home-header">${brand()}</div>
      <h1>Find a Service</h1>
      <div class="search"><span>⌕</span><input id="searchInput" value="Hair" placeholder="Search services..."></div>
      <p class="text-muted">Brooklyn, NY · 3 results</p>
      <div class="cards">
        ${businesses.map((b,i)=>`
          <article class="service-card">
            <div class="service-image"></div>
            <small style="color:var(--yellow)">★ ${i===0?"Top Rated":"Popular"}</small>
            <h2>${b[0]}</h2><p class="text-muted">${b[2]}</p>
            <p>Starting at <strong>${b[1]}</strong></p>
            <button class="btn btn-primary btn-block" data-nav="/business">View Business →</button>
          </article>`).join("")}
      </div>
    </div>
    <nav class="bottom-nav">
      <button class="nav-item" data-nav="/home">⌂<br><small>Home</small></button>
      <button class="nav-item active" data-nav="/search">⌕<br><small>Explore</small></button>
      <button class="nav-item">▣<br><small>Bookings</small></button>
      <button class="nav-item">♙<br><small>Profile</small></button>
    </nav>
  `);
  bindNavigation();
});

route("/business", async () => {
  app.innerHTML = layout(`
    <div class="container home-main">
      <div class="home-header">${brand()}</div>
      <div class="glass auth-card">
        <div class="service-image" style="height:240px"></div>
        <small style="color:var(--yellow)">★ 4.8 · 312 reviews</small>
        <h1>The Luxe Hair Studio</h1>
        <p class="text-muted">Brooklyn, NY · Luxury hair care in a modern, stylish environment.</p>
        <div class="section-head"><h2>Services & Pricing</h2></div>
        ${[["Women's Haircut","$45","45 min"],["Color (Single Process)","$85","1 hr 30 min"],["Balayage","$150","2 hr"]].map(s=>`
          <div class="service-card" style="display:flex;justify-content:space-between;align-items:center;margin:10px 0">
            <div><strong>${s[0]}</strong><div class="text-muted">${s[2]} · ${s[1]}</div></div>
            <button class="btn btn-primary" data-nav="/book">Book</button>
          </div>`).join("")}
      </div>
    </div>
  `);
  bindNavigation();
});

route("/book", async () => {
  app.innerHTML = layout(`
    <div class="container home-main">
      <div class="home-header">${brand()}</div>
      <div class="glass auth-card">
        <small style="color:var(--cyan)">BOOKING</small>
        <h1>Women's Haircut</h1>
        <p class="text-muted">The Luxe Hair Studio · $45 · 45 min</p>
        <div class="section-head"><h2>Choose a Date</h2></div>
        <div class="category-row">
          ${["Wed Apr 22","Thu Apr 23","Fri Apr 24","Sat Apr 25"].map((d,i)=>`<button class="category" data-date="${d}">${d}</button>`).join("")}
        </div>
        <div class="section-head"><h2>Available Times</h2></div>
        <div class="category-row">
          ${["9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:30 PM","4:00 PM","5:30 PM"].map(t=>`<button class="category" data-time="${t}">${t}</button>`).join("")}
        </div>
        <button class="btn btn-primary btn-block" id="confirmBooking" style="margin-top:25px">Continue →</button>
      </div>
    </div>
  `);
  bindNavigation();
  let date = "Wed Apr 22", time = "2:30 PM";
  document.querySelectorAll("[data-date]").forEach(b=>b.onclick=()=>date=b.dataset.date);
  document.querySelectorAll("[data-time]").forEach(b=>b.onclick=()=>time=b.dataset.time);
  document.querySelector("#confirmBooking").onclick=()=> {
    window.__pendingBooking = { business:"The Luxe Hair Studio", service:"Women's Haircut", price:45, date, time };
    navigate("/confirmation");
  };
});

route("/confirmation", async () => {
  const b = window.__pendingBooking || { business:"The Luxe Hair Studio", service:"Women's Haircut", price:45, date:"Wed Apr 22", time:"2:30 PM" };
  app.innerHTML = layout(`
    <main class="hero">
      <div class="glass auth-card" style="width:min(620px,100%);margin:auto;text-align:center">
        <div style="font-size:64px">✓</div>
        <h1>You're <span class="gradient-text">Booked!</span></h1>
        <p class="text-muted">Your appointment has been confirmed.</p>
        <div class="service-card" style="text-align:left;margin:24px 0">
          <h2>${b.business}</h2>
          <p>${b.service} · $${b.price}</p>
          <p class="text-muted">${b.date} · ${b.time}</p>
        </div>
        <button class="btn btn-primary btn-block" id="saveBooking">View My Bookings</button>
      </div>
    </main>
  `);
  document.querySelector("#saveBooking").onclick=()=> {
    import("./state.js").then(({createAppointment}) => {
      createAppointment(b);
      navigate("/bookings");
    });
  };
});

route("/bookings", async () => {
  const state = getState();
  app.innerHTML = layout(`
    <div class="container home-main">
      <div class="home-header">${brand()}</div>
      <h1>My Bookings</h1>
      <div class="category-row"><button class="btn btn-primary">Upcoming</button><button class="btn">Past</button></div>
      ${state.appointments.length ? state.appointments.map(a=>`
        <article class="service-card" style="margin:14px 0">
          <small style="color:var(--success)">● ${a.status}</small>
          <h2>${a.business}</h2>
          <p>${a.service} · $${a.price}</p>
          <p class="text-muted">${a.date} · ${a.time}</p>
          <button class="btn">Reschedule</button>
          <button class="btn">Cancel</button>
        </article>`).join("") : `<div class="glass auth-card"><h2>No bookings yet</h2><p class="text-muted">Your confirmed appointments will appear here.</p><button class="btn btn-primary" data-nav="/search">Find a Service →</button></div>`}
    </div>
    <nav class="bottom-nav">
      <button class="nav-item" data-nav="/home">⌂<br><small>Home</small></button>
      <button class="nav-item" data-nav="/search">⌕<br><small>Explore</small></button>
      <button class="nav-item active" data-nav="/bookings">▣<br><small>Bookings</small></button>
      <button class="nav-item">♙<br><small>Profile</small></button>
    </nav>
  `);
  bindNavigation();
});

function bindNavigation() {
  document.querySelectorAll("[data-nav]").forEach(el => {
    el.addEventListener("click", () => navigate(el.dataset.nav));
  });
}

renderCurrent();
