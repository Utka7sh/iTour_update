const greeting = document.querySelector('.greeting');
const logOut = document.querySelector('.logout');

window.onload = () => {
    if (!sessionStorage.name) {
        location.href = '/login';
    } else {
        // Use backticks for template literals
        greeting.innerHTML = `Hello ${sessionStorage.name}`;
    }
}

logOut.onclick = () => {
    sessionStorage.clear();
    location.href = '/login';
}
