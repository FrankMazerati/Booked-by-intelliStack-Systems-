// Global State to hold user data, bookings, etc.
const AppState = {
    user: {
        name: "Glam",
        points: 425,
        avatar: "https://i.pravatar.cc/150?img=47"
    },
    activeTab: 'home',
    
    // Placeholder data for rendering
    flashDeals: [
        { id: 1, name: "The Cut Barbershop", service: "Signature Cut", price: 29, oldPrice: 45, discount: "36%", time: "2h 18m", distance: "1.1 mi" },
        { id: 2, name: "Nail Luxe", service: "Gel Manicure", price: 40, oldPrice: 65, discount: "50%", time: "3h 12m", distance: "1.8 mi" }
    ]
};
