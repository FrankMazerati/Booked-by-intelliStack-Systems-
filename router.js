const routes = new Map();

export function route(path, handler) {
  routes.set(path, handler);
}

export function navigate(path) {
  history.pushState({}, "", `#${path}`);
  renderCurrent();
}

export async function renderCurrent() {
  const path = location.hash.replace(/^#/, "") || "/";
  const handler = routes.get(path) || routes.get("/");
  if (handler) await handler();
}

window.addEventListener("popstate", renderCurrent);
window.addEventListener("hashchange", renderCurrent);
