document.getElementById('appointment-form').addEventListener('submit', function (e) {
    let isValid = true; // Flag to track overall form validity

    // Full Name Validation
    const fullName = document.getElementById('FullName').value;
    const fullNameRegex = /^([A-Z][a-z]+(?: [A-Z][a-z]+){1,3})$/;
    const fullNameError = document.getElementById('fullnameError');
    if (!fullNameRegex.test(fullName)) {
        fullNameError.style.display = 'block';
        isValid = false; // Set validity flag to false
    } else {
        fullNameError.style.display = 'none';
    }

    // Phone Number Validation
    const phone = document.getElementById('Yourphone').value;
    const phoneRegex = /^(010|011|012|015)\d{8}$/;
    const phoneError = document.getElementById('phoneError');
    if (!phoneRegex.test(phone)) {
        phoneError.style.display = 'block';
        isValid = false;
    } else {
        phoneError.style.display = 'none';
    }

    // Email Validation
    const email = document.getElementById('email').value;
    const emailRegex = /^[\w-\._\+%]+@(outlook|yahoo|gmail|mail\.com|inbox\.com|icloud)\./;
    const emailError = document.getElementById('emailError');
    if (!emailRegex.test(email)) {
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    // If any field is invalid, prevent form submission
    if (isValid == false) {
        e.preventDefault();
    } else if (isValid == true) {
        // Gather data from the form
        const gender = document.getElementById('gender').value;
        const department = document.getElementById('departement').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('Time').value;
        const sickness = document.getElementById('sickness').value;

        // Retrieve existing appointments from localStorage
        let appointmentsByDepartment = JSON.parse(localStorage.getItem('appointmentsByDepartment')) || {};

        // Check if any appointment already exists for the selected date and time in the specific department
        if (!appointmentsByDepartment[department]) {
            appointmentsByDepartment[department] = []; // Create department array if it doesn't exist
        }

        const conflictingAppointment = appointmentsByDepartment[department].find(appointment => appointment.date === date && appointment.time === time);

        if (conflictingAppointment) {
            alert("This time slot is already taken in this department. Please choose a different time.");
            e.preventDefault(); // Prevent form submission
        } else {
            // Create a new appointment object
            const appointmentData = {
                fullName,
                phone,
                email,
                sickness,
                gender,
                department,
                date,
                time
            };

            // Add the new appointment data to the specific department array
            appointmentsByDepartment[department].push(appointmentData);

            // Store the updated appointmentsByDepartment object in localStorage
            localStorage.setItem('appointmentsByDepartment', JSON.stringify(appointmentsByDepartment));

            // Display the stored data
            displayStoredData();
        }
    }
});

function displayStoredData() {
    const storedAppointmentsByDepartment = JSON.parse(localStorage.getItem('appointmentsByDepartment')) || {};

    let output = '';

    // Iterate over departments and their appointments
    for (const department in storedAppointmentsByDepartment) {
        if (storedAppointmentsByDepartment.hasOwnProperty(department)) {
            output += `Department: ${department}\n`;
            storedAppointmentsByDepartment[department].forEach((appointment, index) => {
                output += `
                    Appointment ${index + 1}: 
                    Name: ${appointment.fullName}, 
                    Phone: ${appointment.phone}, 
                    Email: ${appointment.email}, 
                    Sickness: ${appointment.sickness}, 
                    Gender: ${appointment.gender}, 
                    Date: ${appointment.date}, 
                    Time: ${appointment.time}\n\n`;
            });
            output += '\n'; // Add a line break between departments
        }
    }

    if (output) {
        document.getElementById('storedData').textContent = output;
    } else {
        document.getElementById('storedData').textContent = 'No data stored.';
    }
}
