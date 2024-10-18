let removeBtns, numProducts, decreaseBtns, increaseBtns, subtotals;
let products;

if (localStorage.getItem("products") === null) {
  products = [];
  document.querySelector(".empty").classList.remove("d-none");
  document.querySelector(".notEmpty").classList.add("d-none");
} else {
  products = JSON.parse(localStorage.getItem("products"));
  if (products.length !== 0) {
    document.querySelector(".empty").classList.add("d-none");
    document.querySelector(".notEmpty").classList.remove("d-none");
    displayProducts();
    removeBtns = document.querySelectorAll(".removeBtn");
    decreaseBtns = document.querySelectorAll(".decreaseBtn");
    increaseBtns = document.querySelectorAll(".increaseBtn");
  }
}

// Function to remove a product
function removeProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));

  if (products.length === 0) {
    document.querySelector(".empty").classList.remove("d-none");
    document.querySelector(".notEmpty").classList.add("d-none");
  }

  displayProducts();
  calcTotalsAndSub();
}

// Increase product quantity
function increaseNum(index) {
  products = JSON.parse(localStorage.getItem("products"));
  products[index].quantity += 1;
  localStorage.setItem("products", JSON.stringify(products));

  let numProductElement = document.querySelectorAll('.numProduct')[index];
  numProductElement.textContent = products[index].quantity;

  localStorage.setItem(`numProduct${index}`, products[index].quantity);
  calcSubtotals(index);
  calcTotalsAndSub();
}

// Decrease product quantity
function decreaseNum(index) {
  products = JSON.parse(localStorage.getItem("products"));

  if (products[index].quantity > 1) {
    products[index].quantity -= 1;
    localStorage.setItem("products", JSON.stringify(products));

    let numProductElement = document.querySelectorAll('.numProduct')[index];
    numProductElement.textContent = products[index].quantity;

    localStorage.setItem(`numProduct${index}`, products[index].quantity);
    calcSubtotals(index);
    calcTotalsAndSub();
  } else {
    removeProduct(index);
  }
}

// Calculate subtotals for each product
function calcSubtotals(index) {
  products = JSON.parse(localStorage.getItem("products"));
  let quantity = products[index].quantity;
  let price = parseFloat(products[index].price);
  let subtotal = quantity * price;

  subtotals[index].textContent = subtotal.toFixed(2);
  console.log(subtotals);
  
  calcTotalsAndSub();
}



function calcTotalsAndSub() {
  let result = 0; // Initialize result to 0
  const subtotals = document.querySelectorAll('.subtotal'); // Get all subtotals elements

  // Step 1: Sum all subtotals
  subtotals.forEach(subtotalElement => {
    result += parseFloat(subtotalElement.textContent); // Sum each subtotal
  });

  // Step 2: Check selected payment method (from localStorage or default to "visa")
  const selectedPaymentMethod = localStorage.getItem('selectedPaymentMethod') || 'visa';
  let shippingCost = 0; // Default shipping cost to 0

  // Step 3: Adjust based on the selected payment method
  if (selectedPaymentMethod === "receipt") {
    result += 10.00; // Add $10 fee for Pay Upon Receipt
    shippingCost = 10.00; // Set shipping cost to $10 for Pay Upon Receipt
  } else if (selectedPaymentMethod === "visa") {
    shippingCost = 0; // Shipping cost is $0 for Pay by Visa
  }

  // Step 4: Save the result to localStorage
  localStorage.setItem("result", result.toFixed(2));

  // Step 5: Update the UI
  const totalCost = result; // Calculate the total cost including shipping
  document.querySelectorAll(".cartTotalSub").forEach(e => e.textContent = totalCost.toFixed(1) + '$'); // Update cart total
  document.querySelector('.shipping').textContent = shippingCost.toFixed(2) + '$'; // Update shipping cost
}

function setPaymentMethod() {
  const savedPaymentMethod = localStorage.getItem('selectedPaymentMethod');
  if (savedPaymentMethod) {
    document.querySelector(`input[value="${savedPaymentMethod}"]`).checked = true; // Restore the saved selection
  }
}

// Payment method event handling
document.addEventListener('DOMContentLoaded', function () {
  const paymentOptions = document.querySelectorAll('input[name="payment"]');

  // Step 1: Restore the saved payment method
  setPaymentMethod();

  // Step 2: Initial calculation on page load
  calcTotalsAndSub();

  // Add event listener for payment method change
  paymentOptions.forEach(option => {
    option.addEventListener('change', function () {
      const selectedPayment = this.value;

      // Save the selected payment method to localStorage
      localStorage.setItem('selectedPaymentMethod', selectedPayment);

      // Recalculate total when payment method is changed
      calcTotalsAndSub();
    });
  });
});






// Display products in the cart
function displayProducts() {
  let content = "";
  for (let i = 0; i < products.length; i++) {
    content += `
      <tr>
        <td class="text-danger align-middle">
          <i class="fa-solid fa-xmark removeBtn" onclick="removeProduct(${i})"></i>
        </td>
        <td class="align-middle"><img src="${products[i].srcImg}" alt="Product" style="width: 100px;"></td>
        <td class="weight align-middle">${products[i].name}</td>
        <td class="align-middle">$${products[i].price}</td>
        <td class="align-middle">
          <div class="border rounded-5 p-2 fit">
            <button onclick="decreaseNum(${i})" class="decreaseBtn btn p-0 h-auto bg-color text-white p-1 px-2 rounded-circle">
              <i class="fa-solid fa-minus"></i>
            </button>
            <span class="numProduct mx-3 fs-5">${products[i].quantity}</span>
            <button onclick="increaseNum(${i})" class="increaseBtn btn p-0 h-auto bg-color text-white p-1 px-2 rounded-circle">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </td>
        <td class="align-middle">
          $<span class="subtotal">${(products[i].price * products[i].quantity).toFixed(2)}</span>
        </td>
      </tr>
    `;
  }

  document.querySelector(".notEmpty tbody").innerHTML = content;
  subtotals = document.querySelectorAll(".subtotal");
  numProducts = document.querySelectorAll(".numProduct");
  calcTotalsAndSub();
}


