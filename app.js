document.addEventListener("DOMContentLoaded", () => {
  console.log("BOOK'D Controller Running - Full Features & AI Engine Loaded");

  // SAMPLE DATA ENGINE
  const sampleListings = [
    { id: 1, name: "South Beach Bistro", category: "restaurants", rating: "4.9", location: "Miami Beach" },
    { id: 2, name: "Prime Cut Studio", category: "barbers", rating: "4.8", location: "Downtown Miami" },
    { id: 3, name: "Glow & Glam Lash & Nails", category: "nails", rating: "5.0", location: "Brickell" },
    { id: 4, name: "Pulse Fitness Lab", category: "fitness", rating: "4.7", location: "Wynwood" },
    { id: 5, name: "Ocean Spa & Retreat", category: "wellness", rating: "4.9", location: "Coconut Grove" }
  ];

  const listingsGrid = document.getElementById("listingsGrid");

  function renderListings(items) {
    if (!listingsGrid) return;
    listingsGrid.innerHTML = items.map(item => `
      <div class="category-card" style="margin-bottom: 12px;">
        <h3 style="color: var(--booked-cyan);">${item.name}</h3>
        <p style="color: var(--white);">${item.location} • ★ ${item.rating}</p>
        <p style="text-transform: capitalize; font-size: 0.75rem;">Category: ${item.category}</p>
        <button class="btn-action" style="margin-top:8px;" onclick="bookItem('${item.name}')">Book Appointment</button>
      </div>
    `).join("");
  }

  renderListings(sampleListings);

  // SCREEN VIEW SWITCHER (6 BOTTOM NAV ITEMS)
  const navItems = document.querySelectorAll(".nav-item");
  const views = {
    home: document.getElementById("view-home"),
    search: document.getElementById("view-home"),
    bookings: document.getElementById("view-bookings"),
    favorites: document.getElementById("view-favorites"),
    rewards: document.getElementById("view-rewards"),
    profile: document.getElementById("view-profile")
  };

  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const target = item.getAttribute("data-target");

      navItems.forEach(n => n.classList.remove("active"));
      item.classList.add("active");

      Object.values(views).forEach(v => {
        if (v) {
          v.classList.add("hidden");
          v.classList.remove("active");
        }
      });

      if (views[target]) {
        views[target].classList.remove("hidden");
        views[target].classList.add("active");
      }

      if (target === "search") {
        document.getElementById("searchInput")?.focus();
      }
    });
  });

  // CATEGORY FILTERING
  const categoryCards = document.querySelectorAll(".category-card[data-category]");
  categoryCards.forEach(card => {
    card.addEventListener("click", () => {
      const selectedCat = card.getAttribute("data-category");
      const filtered = sampleListings.filter(l => l.category === selectedCat);
      renderListings(filtered.length ? filtered : sampleListings);
    });
  });

  // =====================================================
  // AI CHATBOT CONTROLLER LOGIC
  // =====================================================
  const chatToggleBtn = document.getElementById("chatToggleBtn");
  const chatCloseBtn = document.getElementById("chatCloseBtn");
  const chatDrawer = document.getElementById("chatDrawer");
  const chatInput = document.getElementById("chatInput");
  const chatSendBtn = document.getElementById("chatSendBtn");
  const chatMessages = document.getElementById("chatMessages");

  if (chatToggleBtn && chatDrawer) {
    chatToggleBtn.addEventListener("click", () => {
      chatDrawer.classList.toggle("hidden");
    });
  }

  if (chatCloseBtn) {
    chatCloseBtn.addEventListener("click", () => {
      chatDrawer.classList.add("hidden");
    });
  }

  if (chatSendBtn && chatInput) {
    chatSendBtn.addEventListener("click", handleUserMessage);
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleUserMessage();
    });
  }

  function handleUserMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage(text, "user");
    chatInput.value = "";

    setTimeout(() => {
      generateAIResponse(text);
    }, 600);
  }

  window.sendQuickPrompt = function(promptText) {
    if (chatDrawer.classList.contains("hidden")) {
      chatDrawer.classList.remove("hidden");
    }
    appendMessage(promptText, "user");
    setTimeout(() => {
      generateAIResponse(promptText);
    }, 600);
  };

  function appendMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${sender === "user" ? "user-message" : "ai-message"}`;
    msgDiv.innerHTML = `<div class="msg-bubble">${text}</div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function generateAIResponse(userText) {
    const query = userText.toLowerCase();
    let replyText = "";
    let cardHTML = "";

    if (query.includes("available") || query.includes("today") || query.includes("around me")) {
      replyText = "Here are top-rated spots nearby with open slots available today:";
      cardHTML = `
        <div class="chat-action-card">
          <h4>💈 Prime Cut Studio</h4>
          <p>Haircut & Beard Trim • 3:30 PM today</p>
          <button class="btn-action" onclick="bookItem('Prime Cut Studio')">Book Fast Slot</button>
        </div>
        <div class="chat-action-card">
          <h4>🍣 South Beach Bistro</h4>
          <p>Patio Dining • Openings at 6:00 PM</p>
          <button class="btn-action" onclick="bookItem('South Beach Bistro')">Reserve Table</button>
        </div>
      `;
    } else if (query.includes("barber") || query.includes("hair") || query.includes("cut")) {
      replyText = "Found an available appointment at Prime Cut Studio in Downtown Miami!";
      cardHTML = `
        <div class="chat-action-card">
          <h4>💈 Prime Cut Studio</h4>
          <p>⭐ 4.8 Rating • 1.2 miles away</p>
          <button class="btn-action" onclick="bookItem('Prime Cut Studio')">Book Appointment</button>
        </div>
      `;
    } else if (query.includes("dinner") || query.includes("restaurant") || query.includes("food")) {
      replyText = "Here is the top dining spot open near you tonight:";
      cardHTML = `
        <div class="chat-action-card">
          <h4>🍷 VIP Ocean Dining</h4>
          <p>⭐ 4.9 Rating • Prime Table @ 8:00 PM</p>
          <button class="btn-action" onclick="bookItem('VIP Ocean Dining')">Reserve Table</button>
        </div>
      `;
    } else {
      replyText = `I found a few spots matching "${userText}". Would you like me to check afternoon or evening availability?`;
    }

    const msgDiv = document.createElement("div");
    msgDiv.className = "message ai-message";
    msgDiv.innerHTML = `
      <div class="msg-bubble">
        ${replyText}
        ${cardHTML}
      </div>
    `;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});

// GLOBAL ACTION HANDLER
function bookItem(name) {
  alert(`Booking initiated for ${name}! Opening interactive calendar...`);
}
