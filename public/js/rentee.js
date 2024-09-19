document.addEventListener('DOMContentLoaded', () => {
    // Retrieve user details from sessionStorage
    const userName = sessionStorage.getItem('name');
    const userEmail = sessionStorage.getItem('email');
    const userPhone = sessionStorage.getItem('number');
    const userAge = sessionStorage.getItem('age');
   
    // Set user details in the HTML
    document.getElementById('userName').textContent = userName;
    document.getElementById('userEmail').textContent = userEmail;
    document.getElementById('userNumber').textContent = userPhone;
    document.getElementById('userAge').textContent = userAge;
 
});
