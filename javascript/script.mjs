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
        
    }async function addPatient(name, surname, pesel, age, disease, hospitalWard) {
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

    async function showPatients() {
        try {
            const response = await fetch('/api/select-patients');
            if (!response.ok) {
                throw new Error('Failed to show patients');
            }
            const data = await response.json();
            const listElement = document.getElementById("patientList");
            if (listElement) {
                const dataString = JSON.stringify(data, null, 2); // zmienia dane na tekst
                listElement.innerHTML = `<pre>${dataString}</pre>`;
            } else {
                console.error('Element with ID "patientList" not found');
            }
            return true;
        } catch (error) {
            console.error('Request failed:', error);
            return false;
        }
    }
    window.buttonTest = async function() {
        await submitForm(); // pokazuje formularz
    };

    window.buttonShow = async function() {
        const patients = await showPatients();
        for(let i = 0; i < patients.length; i++) {
            console.log(patients[i]);
        }
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
            await showPatients();
        } catch (error) {
            console.error('Request failed:', error);
        }
    }

    connectDatabase();  // Wywołanie funkcji połączenia z bazą danych
});

