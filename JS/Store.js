let addBtns = document.querySelectorAll(".addBtn");

let products;

// window.localStorage.clear()  

// Check if there's already a stored 'products' array in localStorage
if (localStorage.getItem("products") === null) {
  products = [];
} else {
  products = JSON.parse(localStorage.getItem("products"));
}

addBtns.forEach(btn => {
  btn.onclick = () => {
    // Extract product details
    let srcImg = btn.parentElement.children[0].src;
    let price = btn.parentElement.children[1].children[0].textContent;
    let name = btn.parentElement.children[2].textContent;

    // Check if the product already exists in the products array
    let existingProduct = products.find(product => product.name === name);

    if (existingProduct) {
      // If the product exists, increase the quantity
      existingProduct.quantity += 1;
    } else {
      // If the product is new, add it with a quantity of 1
      let product = {
        name: name,
        price: price,
        quantity: 1, // Initialize with a quantity of 1
        srcImg: srcImg
      };
      products.push(product);
    }

    // Store the updated products array in localStorage
    localStorage.setItem("products", JSON.stringify(products));

    // Change the button appearance temporarily
    btn.innerHTML = `<i class="fa-solid fa-spinner"></i>`;
    btn.classList.remove("opacity-1");

    setTimeout(() => {
      btn.innerHTML = `Add to Cart`; // Change to "Add to Cart"
      btn.classList.add("opacity-0");
    }, 1000);

};
});
