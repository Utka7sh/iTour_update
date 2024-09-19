const navbar = document.querySelector('.header .navbar');
const navbarHeight = 100;
let lastScrollTop = 0;

document.querySelector('#menu-btn')?.addEventListener('click', () => {
    navbar.classList.add('active');
});

document.querySelector('#nav-close')?.addEventListener('click', () => {
    navbar.classList.remove('active');
});

const searchForm = document.querySelector('.search-form');
const searchBtn = document.querySelector('#search-btn');
const closeSearchBtn = document.querySelector('#close-search');

if (searchBtn && closeSearchBtn) {
    searchBtn.addEventListener('click', () => {
        searchForm.classList.add('active');
    });

    closeSearchBtn.addEventListener('click', () => {
        searchForm.classList.remove('active');
    });
}

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > navbarHeight) {
        navbar.classList.remove('active');
    }

    lastScrollTop = Math.max(scrollTop, 0);
});

document.querySelector('#loginLink')?.addEventListener('click', () => {
    window.location.href = 'login.html';
});

document.querySelector('#logout')?.addEventListener('click', () => {
    window.location.href = 'logout.html';
});
