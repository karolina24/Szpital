

document.addEventListener('DOMContentLoaded', function () {
    let addPatientButtons = document.querySelectorAll('.btn');
    addPatientButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            button.classList.toggle('pressed');
        });
    });

    const showHospitalWardButton = document.getElementById('showHospitalWardButton');
    showHospitalWardButton.addEventListener('click', async function () {
        await buttonShowHospitalWard();
    });

    window.buttonTest = async function () {
        await submitForm();
    };

    window.deletePatient = async function () {
        try {
            const peselToRemove = document.getElementById('peselToRemove').value;
            const response = await fetch('/api/delete-patient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ patient: peselToRemove })
            });

            if (!response.ok) {
                throw new Error('Failed to remove patient');
            }

            const responseData = await response.json();
            console.log('Patient removed successfully:', responseData);
            // await showPatients();
        } catch (error) {
            console.error('Request failed:', error);
        }
    }

    async function showHospitalWard() {
        try {
            const selectedHospitalWard = document.getElementById('selectHospitalWard').value;
            const response = await fetch('/api/select-ward', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ hospitalWard: selectedHospitalWard })
            });

            if (!response.ok) {
                throw new Error('Failed to select hospital ward');
            }

            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error('Request failed:', error);
        }
    }window.buttonShowHospitalWard = async function () {
    const doctorsTable = document.querySelector('#hospitalWardDoctorsTable');
    const nursesTable = document.querySelector('#hospitalWardNursesTable');
    const patientsTable = document.querySelector('#hospitalWardPatientsTable');
    const doctorTitleRow = document.createElement('tr');
    const doctorInforRow = document.createElement('tr');
    const nursesTitleRow = document.createElement('tr');
    const nursesInforRow = document.createElement('tr');
    const patientsTitleRow = document.createElement('tr');
    const patientsInforRow = document.createElement('tr');

    doctorsTable.style.display = (doctorsTable.style.display === 'block') ? 'none' : 'block';
    nursesTable.style.display = (nursesTable.style.display === 'block') ? 'none' : 'block';
    patientsTable.style.display = (patientsTable.style.display === 'block') ? 'none' : 'block';

    try {
        const hospitalWard = await showHospitalWard();
        if (hospitalWard) {
            doctorsTable.innerHTML = '';
            nursesTable.innerHTML = '';
            patientsTable.innerHTML = '';

         // Tabela dla lekarzy
doctorTitleRow.innerHTML = `<th colspan="3" style="text-align: center;">Lekarze</th>`;
doctorsTable.appendChild(doctorTitleRow);

doctorInforRow.innerHTML = `
    <th>Imię</th>
    <th>Nazwisko</th>
    <th>Specjalizacja </th>
`;
doctorsTable.appendChild(doctorInforRow);

hospitalWard.message.doctors.forEach((doctor) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${doctor.name}</td>
        <td>${doctor.surname}</td>
        <td>${doctor.specialization}</td>
    `;
    doctorsTable.appendChild(row);
});

// Tabela dla pielęgniarek
nursesTitleRow.innerHTML = `<th colspan="2" style="text-align: center;">Pielęgniarki</th>`;
nursesTable.appendChild(nursesTitleRow);

nursesInforRow.innerHTML = `
    <th>Imię</th>
    <th>Nazwisko</th>

`;
nursesTable.appendChild(nursesInforRow);

hospitalWard.message.nurses.forEach((nurse) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${nurse.name}</td>
        <td>${nurse.surname}</td>
    `;
    nursesTable.appendChild(row);
});

patientsTitleRow.innerHTML = `<th colspan="5" style="text-align: center;">Pacjenci</th>`;
patientsTable.appendChild(patientsTitleRow);

patientsInforRow.innerHTML = `
    <th>Imię</th>
    <th>Nazwisko</th>
    <th>Wiek</th>
    <th>PESEL</th>
    <th>Rozpoznanie</th>
`;
patientsTable.appendChild(patientsInforRow);

hospitalWard.message.patients.forEach((patient) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${patient.name}</td>
        <td>${patient.surname}</td>
        <td>${patient.age}</td>
        <td>${patient.personal_number}</td>
        <td>${patient.disease}</td>
    `;
    patientsTable.appendChild(row);
});
        } else {
            console.log('No records found.');
        }
    } catch (error) {
        console.error('Error retrieving doctors records:', error);
    }
};




    async function connectDatabase() {
        try {
            const response = await fetch('/api/connect');
            if (!response.ok) {
                throw new Error('Failed to connect to the database');
            }
            const data = await response.json();
            console.log('Request successful:', data);
            return true;
        } catch (error) {
            console.error('Request failed:', error);
            return false;
        }
    }

    async function addPatient(name, surname, pesel, age, disease, hospitalWard) {
        const data = {
            name: name,
            surname: surname,
            age: age,
            personal_number: pesel,
            disease: disease,
            hospital_ward: hospitalWard
        };

        try {
            const response = await fetch('/api/add-patient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to add patient');
            }

            const responseData = await response.json();
            console.log('Request successful:', responseData);
            return true;
        } catch (error) {
            console.error('Request failed:', error);
            return false;
        }
    }

    

    async function submitForm() {
        console.log('submitForm called');
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const pesel = document.getElementById('pesel').value;
        const age = document.getElementById('age').value;
        const disease = document.getElementById('disease').value;
        const hospitalWard = document.getElementById('hospitalWard').value;

        await addPatient(name, surname, pesel, age, disease, hospitalWard);
        await showPatients();
    }

    async function showPatients() {
        try {
            const response = await fetch('/api/select-patients');
            if (!response.ok) {
                throw new Error('Failed to show patients');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Request failed:', error);
            return false;
        }
    }

    window.buttonShow = async function () {
        const table = document.querySelector('#patientsTable');
        table.style.display = 'block';
        try {
            const patients = await showPatients();
            if (patients) {
                patients.message.forEach((patient) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${patient.id_patient}</td>
                        <td>${patient.name}</td>
                        <td>${patient.surname}</td>
                        <td>${patient.age}</td>
                        <td>${patient.personal_number}</td>
                        <td>${patient.disease}</td>
                        <td>${patient.hospital_ward}</td>
                    `;
                    table.appendChild(row);
                });
            } else {
                console.log('No patient records found.');
            }
        } catch (error) {
            console.error('Error retrieving patient records:', error);
        }
    }

    async function showNurses() {
        try {
            const response = await fetch('/api/select-nurses');
            if (!response.ok) {
                throw new Error('Failed to show nurses');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Request failed:', error);
            return false;
        }
    }

    window.buttonShowNurses = async function () {
        const table = document.querySelector('#nursesTable');
        table.style.display = 'block';
        try {
            const nurses = await showNurses();
            if (nurses) {
                nurses.message.forEach((nurse) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${nurse.id_nurse}</td>
                        <td>${nurse.name}</td>
                        <td>${nurse.surname}</td>
                        <td>${nurse.hospital_ward}</td>
                    `;
                    table.appendChild(row);
                });
            } else {
                console.log('No nurse records found.');
            }
        } catch (error) {
            console.error('Error retrieving nurse records:', error);
        }
    }

    async function showDoctors() {
        try {
            const response = await fetch('/api/select-doctors');
            if (!response.ok) {
                throw new Error('Failed to show doctors');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Request failed:', error);
            return false;
        }
    }

    window.buttonShowDoctors = async function () {
        const table = document.querySelector('#doctorsTable');
        table.style.display = 'block';
        try {
            const doctors = await showDoctors();
            if (doctors) {
                doctors.message.forEach((doctor) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${doctor.id_doctor}</td>
                        <td>${doctor.name}</td>
                        <td>${doctor.surname}</td>
                        <td>${doctor.specialization}</td>
                        <td>${doctor.hospital_ward}</td>
                    `;
                    table.appendChild(row);
                });
            } else {
                console.log('No doctors records found.');
            }
        } catch (error) {
            console.error('Error retrieving doctors records:', error);
        }
    }

    connectDatabase();
});
