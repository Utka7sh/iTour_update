const navbar = document.querySelector('.header .navbar');
let lastScrollTop = 0;
const navbarHeight = 100;

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.add('active');
};

document.querySelector('#nav-close').onclick = () => {
    navbar.classList.remove('active');
};

const searchForm = document.querySelector('.search-form');

const searchBtn = document.querySelector('#search-btn');
const closeSearchBtn = document.querySelector('#close-search');

if (searchBtn && closeSearchBtn) {
    searchBtn.onclick = () => {
        searchForm.classList.add('active');
    };

    closeSearchBtn.onclick = () => {
        searchForm.classList.remove('active');
    };
}

window.onscroll = () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > navbarHeight) {
        navbar.classList.remove('active');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
};

document.querySelector('#loginLink').onclick = () => {
    if (document.querySelector('#loginLink')) {
        window.location.href = 'login.html';
    }
};

document.querySelector('#logout').onclick = () => {
    if (document.querySelector('#logout')) {
        window.location.href = 'logout.html';
    }
};
