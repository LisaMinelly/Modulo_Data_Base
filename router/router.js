import createCustomers from "../views/customers/create.js";
import editCustomersView from "../views/customers/edit.js";
import dashboard from "../views/dashboard.js";
import notfound from "../views/not-found.js";

const routes = {
  "/dashboard/customers/create": createCustomers,
  "/dashboard/customers/edit": editCustomersView,
  "/dashboard": dashboard,
};

export async function router() {
  const path = window.location.hash.slice(1).split("?")[0] || "/login";
  const view = routes[path] || notfound;
  document.getElementById("app").innerHTML = await view();
}