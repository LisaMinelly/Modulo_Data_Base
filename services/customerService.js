
const API_URL = "http://localhost:3000/customers";

export async function getCustomers() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function createCustomers(customer) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
  return await res.json();
}

export async function deleteCustomer(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}

export async function getCustomerById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
}

export async function updateCustomer(id, updatedCustomer) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedCustomer),
  });
  return await res.json();
}

