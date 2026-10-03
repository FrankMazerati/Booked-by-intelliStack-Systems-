// Handles navigation between different views (Home, Explore, Bookings, etc.)
const Router = {
    init() {
        const navLinks = document.querySelectorAll('.top-toolbar a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Update state
                AppState.activeTab = link.querySelector('span').innerText.toLowerCase();
                
                // Here you would typically call a function to render the new view
                console.log(`Navigating to: ${AppState.activeTab}`);
            });
        });
    }
};
