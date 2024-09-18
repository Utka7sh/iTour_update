document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const userTypeSelect = document.getElementById('user_type');
    const ownerSection = document.getElementById('owner-section');
    const renteeSection = document.getElementById('rentee-section');
    
    userTypeSelect.addEventListener('change', () => {
        if (userTypeSelect.value === 'owner') {
            ownerSection.style.display = 'block';
            renteeSection.style.display = 'none';
        } else if (userTypeSelect.value === 'rentee') {
            ownerSection.style.display = 'none';
            renteeSection.style.display = 'block';
        } else {
            ownerSection.style.display = 'none';
            renteeSection.style.display = 'none';
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const userData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            number: document.getElementById('number').value,
            password: document.getElementById('password').value,
            
            userType: userTypeSelect.value
        };

        if (userData.userType === 'owner') {
            userData.ownerDetails = {
                property_type: document.getElementById('property_type').value,
                house_number: document.getElementById('house_number').value,
                colony_area: document.getElementById('colony_area').value,
                landmark: document.getElementById('landmark').value,
                pincode: document.getElementById('pincode').value,
                property_for: document.getElementById('property_for').value,
                room_for: document.getElementById('room_for').value,
                ac_available: document.getElementById('ac_available').value,
                television_available: document.getElementById('television_available').value,
                geaser_available: document.getElementById('geaser_available').value,
                price: document.getElementById('price').value,
                image_url: document.getElementById('fileInput').files[0]?.name || null
            };
        } else if (userData.userType === 'rentee') {
            userData.renteeDetails = {
                age: document.getElementById('age').value,
                city: document.getElementById('city').value,
                number_of_travelmates: document.getElementById('number_of_travelmates').value,
                budget: document.getElementById('budget').value,
                gender: document.querySelector('input[name="gender"]:checked')?.value || null,
                female_group: document.getElementById('female-group')?.value || null
            };
        }

        fetch('/register-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alertBox(data.message);
            } else {
                sessionStorage.setItem('name', data.name);
                sessionStorage.setItem('email', data.email);
                sessionStorage.setItem('userType', data.userType);
                window.location.href = data.userType === 'owner' ? '/owner-dashboard.html' : '/rentee-dashboard.html';
            }
        })
        .catch(error => console.error('Error:', error));
    });

    function alertBox(message) {
        const alertContainer = document.querySelector('.alert-box');
        const alertMsg = document.querySelector('.alert');
        alertMsg.innerHTML = message;

        alertContainer.style.top = '5%';
        setTimeout(() => {
            alertContainer.style.top = null;
        }, 5000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');

    loginBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alertBox('Please fill in both email and password.');
            return;
        }

        fetch('/login-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alertBox(data.message);
            } else {
                sessionStorage.setItem('name', data.name);
                sessionStorage.setItem('email', data.email);
                sessionStorage.setItem('userType', data.userType);
                window.location.href = data.userType === 'owner' ? '/owner-dashboard.html' : '/rentee-dashboard.html';
            }
        })
        .catch(error => console.error('Error:', error));
    });

    function alertBox(message) {
        const alertContainer = document.querySelector('.alert-box');
        const alertMsg = document.querySelector('.alert');
        alertMsg.innerHTML = message;

        alertContainer.style.top = '5%';
        setTimeout(() => {
            alertContainer.style.top = null;
        }, 5000);
    }
});
