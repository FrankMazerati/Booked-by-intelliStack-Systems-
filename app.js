// Main application entry point
document.addEventListener('DOMContentLoaded', () => {
    console.log("Booked App Initialized");
    
    // Initialize the router
    Router.init();
    
    // Note: In a real app, you would render the data from AppState here
    // to populate the HTML dynamically. For now, the HTML is static.
    
    // Example: Check if user is logged in
    if (AppState.user) {
        console.log(`Welcome back, ${AppState.user.name}`);
    }
});
