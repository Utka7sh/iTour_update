document.addEventListener('DOMContentLoaded', () => {
    // Retrieve user details from sessionStorage
    const userName = sessionStorage.getItem('name');
    const userEmail = sessionStorage.getItem('email');
    const userPhone = sessionStorage.getItem('number');
    const userAge = sessionStorage.getItem('age');
    const userCity = sessionStorage.getItem('city');
    const userTravelmates = sessionStorage.getItem('number_of_travelmates');
    const userBudget = sessionStorage.getItem('budget');
    const userGender = sessionStorage.getItem('gender');

    // Set user details in the HTML
    document.getElementById('userName').textContent = userName;
    document.getElementById('userEmail').textContent = userEmail;
    document.getElementById('userNumber').textContent = userPhone;
    document.getElementById('userAge').textContent = userAge;
    document.getElementById('userCity').textContent = userCity;
    document.getElementById('userTravelmates').textContent = userTravelmates;
    document.getElementById('userBudget').textContent = userBudget;
    document.getElementById('userGender').textContent = userGender;
});
