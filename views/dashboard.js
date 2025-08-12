import { getCustomers } from "../services/customerService.js";
export default async function dashboard() {
  

    const customers = await getCustomers();

    let content = `
    <h2>Welcome</h2>
      <h3>Administrator panel</h3>
      <a href="#/dashboard/customers/create">➕Add new customer</a><br>
      <ul>
        ${customers.map(customer => `
          <li>
            <strong>${customer.name}</strong>
            <a href="#/dashboard/customers/edit?id=${customer.id}">✏️ Edit</a>
            <button data-id="${customer.id}" class="delete-customer">🗑️ Delete</button>
          </li>
        `).join("")}
      </ul>
    `;
  }
  

window.logout = () => {
  localStorage.clear();
  window.location.hash = "#/customers";
};