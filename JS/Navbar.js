const mainNavbar = document.getElementById('main-navbar');
const stickyNavbar = document.getElementById('sticky-navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) { // adjust the scroll position as needed
        mainNavbar.classList.add('hide');
        stickyNavbar.classList.add('show');
    } else {
        mainNavbar.classList.remove('hide');
        stickyNavbar.classList.remove('show');
    }
});