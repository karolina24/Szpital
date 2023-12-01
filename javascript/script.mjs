document.addEventListener('DOMContentLoaded', function () { //ustawienie przycisku na aktywny
    let addPatientButtons = document.querySelectorAll('.btn');
    addPatientButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            button.classList.toggle('pressed');
        });
    });
});

window.addEventListener('load', () => {
    async function connectDatabase() {                                  // Połaczenie z baza danych
        try {
            const response = await fetch('/api/connect');               // Wysłanie zapytania do serwera
            if (!response.ok) {                                         // Sprawdzenie poprawności odpowiedzi serwera
                throw new Error('Failed to connect to the database');   // Stworzenie nowego wyjatku/błędu     
            }
            const data = await response.json();                         // Pobranie danych z odpowiedzi serwera do zmiennej 'data'
            console.log('Request successful:', data);                   // Wyswietlenie danych w konsoli
            return true;
        } catch (error) {                                               // Złapanie wyjątku
            console.error('Request failed:', error);                    // Wyswietlenie błędów w konsoli
            return false;
        }   
    }

    async function addPatient(name, surname, pesel, age, disease, hospitalWard) {
        const data = {                                                  // Stworzenie obiektu z danymi do przesłania do serwera
            name: name,
            surname: surname,
            age: age,
            personal_number: pesel,
            disease: disease,
            hospital_ward: hospitalWard
        };
    
        try {
            const response = await fetch('/api/add-patient', {          // Wysłanie zapytania do serwera
                method: 'POST',                                         // Metoda POST bo wysyłamy dane
                headers: {                                              // Nagłówki
                    'Content-Type': 'application/json'                  // Typ danych
                },
                body: JSON.stringify(data)                              // Przesłanie danych w formacie JSON
            });
    
            if (!response.ok) {                                         // Sprawdzenie poprawności odpowiedzi serwera
                throw new Error('Failed to add patient');               // Stworzenie nowego wyjatku/błędu
            }
    
            const responseData = await response.json();                 // Pobranie danych z odpowiedzi serwera do zmiennej 'responseData'
            console.log('Request successful:', responseData);           // Wyswietlenie danych w konsoli
            return true;
        }
        
        catch (error) {
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
        await showPatients(); //Pokazuje liste pacjentow po wpisaniu, mozna usunac
    }

    //Pokazuje pacjentów
    async function showPatients() {
        try {
            const response = await fetch('/api/select-patients');       // Wysłanie zapytania do serwera
            if (!response.ok) {                                         // Jeżeli odpowiedź nie jest poprawna
                throw new Error('Failed to show patients');             // Stwórz nowy komunikat błędu
            }
            const data = await response.json();                         // Poczekaj na dane z odpowiedzi serwera
            return data;                                                // Zwróć dane
        } catch (error) {                                               // Złapanie błędu
            console.error('Request failed:', error);                    // Wyświetl błędu w konsoli
            return false;                                               // Zwróć False
        }
    }
    
    window.buttonShow = async function() {
        const table = document.querySelector('#patientsTable');         // Pobranie tabeli jako element ht
        table.style.display = 'block';                                  // Zmienia wartość CSS tabeli
        try {
            const patients = await showPatients();                      // Czekanie na wykonanie i przypisanie danych zwracanych przez funkcje showPatients()
            if (patients) {                                             // Jeśli funckja zwraca dane lub jest True
                patients.message.forEach((patient) => {                 // Pętla dla każdego istniejącego pacjenta (z wartością message bo tak zwraca serwer)
                    const row = document.createElement('tr');           // Stworzenie nowego wiersza i przypisanie do zmiennej
                    row.innerHTML = `
                        <td>${patient.id_patient}</td>
                        <td>${patient.name}</td>
                        <td>${patient.surname}</td>
                        <td>${patient.age}</td>
                        <td>${patient.personal_number}</td>
                        <td>${patient.disease}</td>
                        <td>${patient.hospital_ward}</td>
                    `;
                    table.appendChild(row);                             // Dodaj wiersz do tabeli
                });
            } else {
                console.log('No patient records found.');               // Wyświetlenie komunikatu o braku danych
            }
        } catch (error) {                                               // Złapanie wyjątku
            console.error('Error retrieving patient records:', error);  // Wyswietlenie błędów w konsoli
        }
    }
 //Pokazuje pielęgniarki
    async function showNurses() {
        try {
            const response = await fetch('/api/select-nurses');       // Wysłanie zapytania do serwera
            if (!response.ok) {                                         // Jeżeli odpowiedź nie jest poprawna
                throw new Error('Failed to show nurses');             // Stwórz nowy komunikat błędu
            }
            const data = await response.json();                         // Poczekaj na dane z odpowiedzi serwera
            return data;                                                // Zwróć dane
        } catch (error) {                                               // Złapanie błędu
            console.error('Request failed:', error);                    // Wyświetl błędu w konsoli
            return false;                                               // Zwróć False
        }
    }
    window.buttonShowNurses = async function() {
        const table = document.querySelector('#nursesTable');         // Pobranie tabeli jako element ht
        table.style.display = 'block';                                  // Zmienia wartość CSS tabeli
        try {
            const nurses = await showNurses();                      // Czekanie na wykonanie i przypisanie danych zwracanych przez funkcje showPatients()
            if (nurses) {                                             // Jeśli funckja zwraca dane lub jest True
                nurses.message.forEach((nurse) => {                 // Pętla dla każdego istniejącego pacjenta (z wartością message bo tak zwraca serwer)
                    const row = document.createElement('tr');           // Stworzenie nowego wiersza i przypisanie do zmiennej
                    row.innerHTML = `
                        <td>${nurse.id_nurse}</td>
                        <td>${nurse.name}</td>
                        <td>${nurse.surname}</td>
                        <td>${nurse.hospital_ward}</td>
                    `;
                    table.appendChild(row);                             // Dodaj wiersz do tabeli
                });
            } else {
                console.log('No nurse records found.');               // Wyświetlenie komunikatu o braku danych
            }
        } catch (error) {                                               // Złapanie wyjątku
            console.error('Error retrieving nurse records:', error);  // Wyswietlenie błędów w konsoli
        }
    }

 //Pokazuje lekarzy

    async function showDoctors() {
        try {
            const response = await fetch('/api/select-doctors');       // Wysłanie zapytania do serwera
            if (!response.ok) {                                         // Jeżeli odpowiedź nie jest poprawna
                throw new Error('Failed to show doctors');             // Stwórz nowy komunikat błędu
            }
            const data = await response.json();                         // Poczekaj na dane z odpowiedzi serwera
            return data;                                                // Zwróć dane
        } catch (error) {                                               // Złapanie błędu
            console.error('Request failed:', error);                    // Wyświetl błędu w konsoli
            return false;                                               // Zwróć False
        }
    }
    window.buttonShowDoctors = async function() {
        const table = document.querySelector('#doctorsTable');         // Pobranie tabeli jako element ht
        table.style.display = 'block';                                  // Zmienia wartość CSS tabeli
        try {
            const doctors = await showDoctors();                      // Czekanie na wykonanie i przypisanie danych zwracanych przez funkcje showPatients()
            if (doctors) {                                             // Jeśli funckja zwraca dane lub jest True
                doctors.message.forEach((doctor) => {                 // Pętla dla każdego istniejącego pacjenta (z wartością message bo tak zwraca serwer)
                    const row = document.createElement('tr');           // Stworzenie nowego wiersza i przypisanie do zmiennej
                    row.innerHTML = `
                        <td>${doctor.id_doctor}</td>
                        <td>${doctor.name}</td>
                        <td>${doctor.surname}</td>
                        <td>${doctor.specialization}</td>
                        <td>${doctor.hospital_ward}</td>
                    `;
                    table.appendChild(row);                             // Dodaj wiersz do tabeli
                });
            } else {
                console.log('No doctors records found.');               // Wyświetlenie komunikatu o braku danych
            }
        } catch (error) {                                               // Złapanie wyjątku
            console.error('Error retrieving doctors records:', error);  // Wyswietlenie błędów w konsoli
        }
    }

    window.buttonTest = async function() {
        await submitForm(); // pokazuje formularz
    };

    window.deletePatient = async function(){
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
            const hospitalWardName = 1;
            const response = await fetch('/api/select-ward', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ hospitalWard: hospitalWardName })
            });
    
            if (!response.ok) {
                throw new Error('Failed to select hospital ward');
            }
    
            const responseData = await response.json();
            // console.log(responseData);
            return responseData;
        } catch (error) {
            console.error('Request failed:', error);
        }
    }

    window.buttonShowHospitalWard = async function() {
        const doctorsTable = document.querySelector('#hospitalWardDoctorsTable');    
        const nursesTable = document.querySelector('#hospitalWardNursesTable');
        const patientsTable = document.querySelector('#hospitalWardPatientsTable');     
        doctorsTable.style.display = 'block';  
        nursesTable.style.display = 'block';     
        patientsTable.style.display = 'block';                          
        try {
            const hospitalWard = await showHospitalWard();                      
            if (hospitalWard) {                                          
                hospitalWard.message.doctors.forEach((doctor) => {             
                    const row = document.createElement('tr');          
                    row.innerHTML = `
                        <td>${doctor.name}</td>
                        <td>${doctor.surname}</td>
                        <td>${doctor.specialization}</td>
                    `;
                    doctorsTable.appendChild(row);                             
                });

                hospitalWard.message.nurses.forEach((nurse) => {             
                    const row = document.createElement('tr');          
                    row.innerHTML = `
                        <td>${nurse.name}</td>
                        <td>${nurse.surname}</td>
                    `;
                    nursesTable.appendChild(row);                             
                });

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
    }


    connectDatabase();  // Wywołanie funkcji połączenia z bazą danych
});

