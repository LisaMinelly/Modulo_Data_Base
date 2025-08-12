export default function createCustomers () {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "administrator") {
    return `<p>Access denied</p>`;
  }

  return `
    <h2>Add new customer</h2>
    <form id="createCustomerForm">
      <input type="text" id="name" placeholder="Name" required /><br>
      <input type="text" id="identification" placeholder="Id" required /><br>
      <input type="text" id="direction" placeholder="direction" required /><br>
      <input type="text" id="number_phone" placeholder="number_phone" required /><br>
      <input type="text" id="email" placeholder="email" required /><br>

      <button type="submit">Save</button>
    </form>
    <br>
    <a href="#/dashboard">← Return</a>
  `;
}
