// Switch Dynamic App Worlds (Pink, Blue, Purple, Yellow)
function switchWorld(worldColor, categoryName) {
  // Update CSS root theme attribute
  document.documentElement.setAttribute("data-world", worldColor);

  // Update Category Title Header
  const titleElem = document.getElementById("categoryTitle");
  if (titleElem) {
    titleElem.innerText = categoryName;
  }

  // Navigate to results screen
  showView("resultsView");
}

// Single-Page Navigation Controller
function showView(viewId) {
  const views = document.querySelectorAll(".view");
  views.forEach((v) => v.classList.remove("active"));

  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add("active");
  }
}

// Toggle AI Assistant Window
function toggleChat() {
  const chatModal = document.getElementById("chatModal");
  if (chatModal) {
    chatModal.classList.toggle("open");
  }
}
