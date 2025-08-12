
import { getCustomerById } from "../../services/customerService";

export default async function editCustomerView() {
  const params = new URLSearchParams(window.location.hash.split("?")[1]);
  const id = params.get("id");

  if (!id) return `<p>Error: Customer unspecified.</p>`;

  const customer = await getCustomerById(id);
  if (!customer) return `<p>Customer not found.</p>`;

  return `
    <h2>Edit customer</h2>
    <form id="editCustomerForm">
      <input type="hidden" id="customerId" value="${customer.id}" />
      <label>Name: <input id="name" value="${customer.name}" /></label><br>
      <label>Id: <input id="identification" value="${customer.identification}" /></label><br>
     <label>Direction: <input id="direction" value="${customer.direction}" /></label><br>
     <label>Number Phone: <input id="number_phone" value="${customer.number_phone}" /></label><br>
      <button type="submit">Guardar cambios</button>
    </form>
  `;
}
