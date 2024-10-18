let navbar = document.querySelector(".navbar");
let upBtn = document.querySelector("#upBtn");

window.addEventListener("scroll", () => {
  // Part of navbar
  if (window.scrollY >= 50) {
    navbar.classList.add("shadow", "active");
  } else {
    navbar.classList.remove("shadow", "active");
  }
  // Part of go up button
  if (window.scrollY >= 500) {
    upBtn.classList.remove("d-none");
  } else {
    upBtn.classList.add("d-none");
  }
})

upBtn.onclick = () => {
  window.scrollTo(0, 0);
}

let checkoutHref = document.querySelector(".checkoutHref");

checkoutHref.onclick = () => {
  if (sessionStorage.getItem("products") === null) {
    checkoutHref.href = "../Page/Cart.html";
  } else {
    let products = JSON.parse(sessionStorage.getItem("products"));
    console.log(products)
    if (products.length !== 0) {
      checkoutHref.href = "../Page/Cheakout";
    } else {
      checkoutHref.href = "../Page/Cart";
    }
  }
}