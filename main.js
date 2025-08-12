
// 1. Imports
import { router } from "./router/router.js";
import {createCustomers,deleteCustomer,updateCustomer} from "./services/customerService.js";


// 2. Router
window.addEventListener("hashchange", router);
window.addEventListener("load", router);

// 3. Form management (create, edit)


document.addEventListener("submit", async (e) => {
  e.preventDefault();


  
  // CREATE CUSTOMER
  if (e.target.id === "createCustomerForm") {
    const name = document.getElementById("name").value;
    const identification = document.getElementById("identification").value;
    const direction = document.getElementById("direction").value;
    const number_phone = document.getElementById("number_phone").value;
    const email = document.getElementById("email").value;
    await createCustomers({ name, identification, direction, number_phone, email });
    alert("Client successfully added.");
    window.location.hash = "#/dashboard";
  }

  // EDIT CUSTOMER
  if (e.target.id === "editCustomerForm") {
    const id = document.getElementById("customerId").value;
    const name = document.getElementById("name").value;
    const identification = document.getElementById("identification").value;
    const direction = document.getElementById("direction").value;
    const number_phone = document.getElementById("number_phone").value;
    const email = document.getElementById("email").value;
    await updateCustomer(id,{ name, identification, direction, number_phone, email });
    alert("Client successfully updated.");
    window.location.hash = "#/dashboard";
  }
});



// 4. Click handling (delete customer, reserve customer)
document.addEventListener("click", async (e) => {
  // DELETE CUSTOMER
  if (e.target.classList.contains("delete-customer")) {
    const id = e.target.getAttribute("data-id");
    const confirmation = confirm("Do you want to delete this customer?");
    if (confirmation) {
      await deleteCustomer(id);
      alert("Deleted customer");
      window.location.reload();
    }
  }

  
});
