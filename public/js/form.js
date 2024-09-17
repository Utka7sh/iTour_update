// Form loading animation
const form = [...document.querySelector('.form').children];

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i * 100);
});

window.onload = () => {
    if (sessionStorage.name) {
        location.href = '/';
    }
};

// Form validation
const name = document.querySelector('.name');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');

submitBtn.addEventListener('click', () => {
    const userData = {
        name: name.value,
        email: email.value,
        password: password.value
    };

    // Collect additional details based on user type
    if (document.getElementById('owner-section').style.display === 'block') {
        const ownerDetails = {
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
            image_url: document.getElementById('fileInput').files[0]?.name // Placeholder for image file
        };
        userData.ownerDetails = ownerDetails;
    } else {
        const renteeDetails = {
            age: document.getElementById('age').value,
            city: document.getElementById('city').value,
            number_of_travelmates: document.getElementById('number_of_travelmates').value,
            budget: document.getElementById('budget').value,
            gender: document.querySelector('input[name="gender"]:checked')?.value,
            female_group: document.getElementById('female-group')?.value || null
        };
        userData.renteeDetails = renteeDetails;
    }

    fetch('/register-user', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(data => {
        validateData(data);
    })
    .catch(error => console.error('Error:', error));
});

const validateData = (data) => {
    if (!data.name) {
        alertBox(data.message || 'Registration or login failed.');
    } else {
        // Clear input fields on successful registration/login
        name.value = '';
        email.value = '';
        password.value = '';
        
        sessionStorage.name = data.name;
        sessionStorage.email = data.email;
        location.href = '/';
    }
}

const alertBox = (message) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');
    alertMsg.innerHTML = message;

    alertContainer.style.top = '5%';
    setTimeout(() => {
        alertContainer.style.top = null;
    }, 5000);
}

function toggleForm() {
    const toggleBtn = document.getElementById('toggle-btn');
    const ownerSection = document.getElementById('owner-section');
    const renteeSection = document.getElementById('rentee-section');

    // Check current state and toggle the visibility of sections
    if (ownerSection.style.display === 'none') {
        // Switch to Owner Section
        ownerSection.style.display = 'block';
        renteeSection.style.display = 'none';
        toggleBtn.innerText = 'Rent your property';
    } else {
        // Switch to Rentee Section
        ownerSection.style.display = 'none';
        renteeSection.style.display = 'block';
        toggleBtn.innerText = 'Get property for rent';
    }
}

function displayFileName() {
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileName');
    const files = fileInput.files;
    
    if (files.length > 0) {
        fileNameDisplay.textContent = `Selected file: ${files[0].name}`;
    } else {
        fileNameDisplay.textContent = "No file selected";
    }
}

function showFemaleGroupInput() {
    document.getElementById('female-group-section').style.display = 'block';
}

function hideFemaleGroupInput() {
    document.getElementById('female-group-section').style.display = 'none';
}
