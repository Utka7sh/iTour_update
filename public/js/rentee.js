document.addEventListener('DOMContentLoaded', () => {
    const userId = sessionStorage.getItem('userId');

    if (!userId) {
        console.error('User ID not found in sessionStorage');
        return;
    }

    // Fetch user details from the API
    fetch(`/api/rentee-dashboard/${userId}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error fetching data:', data.error);
                return;
            }

            // Set user details in the HTML
            document.getElementById('userName').textContent = data.name;
            document.getElementById('userEmail').textContent = data.email;
            document.getElementById('userNumber').textContent = data.number;
            document.getElementById('userAge').textContent = data.age;
        })
        .catch(error => console.error('Error fetching data:', error));
});
