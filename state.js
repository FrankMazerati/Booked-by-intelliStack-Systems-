const KEY = "booked_demo_state";

const defaultState = {
  user: null,
  appointments: [],
  favorites: []
};

export function getState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return { ...defaultState };
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
  return state;
}

export function createUser({ name, email }) {
  const state = getState();
  state.user = { id: crypto.randomUUID(), name, email, createdAt: new Date().toISOString() };
  saveState(state);
  return state.user;
}

export function createAppointment(data) {
  const state = getState();
  const appointment = {
    id: crypto.randomUUID(),
    status: "Confirmed",
    createdAt: new Date().toISOString(),
    ...data
  };
  state.appointments.unshift(appointment);
  saveState(state);
  return appointment;
}
