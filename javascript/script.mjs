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

    async function addPatient(name, surname, pesel, disease, hospitalWard) {
        const data = {                                                  // Stworzenie obiektu z danymi do przesłania do serwera
            name: name,
            surname: surname,
            age: surname,
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

    async function showPatients() {
        try {
            const response = await fetch('/api/select-patients');       // Wysłanie zapytania do serwera
            if (!response.ok) {                                         // Sprawdzenie poprawności odpowiedzi serwera
                throw new Error('Failed to show patients');             // Stworzenie nowego wyjatku/błędu     
            }
            const data = await response.json();                         // Pobranie danych z odpowiedzi serwera do zmiennej 'data'
            console.log('Request successful:', data);                   // Wyswietlenie danych w konsoli
            return true;
        } catch (error) {                                               // Złapanie wyjątku
            console.error('Request failed:', error);                    // Wyswietlenie błędów w konsoli
            return false;
        }
    }

    window.buttonTest = async function() {
        await addPatient('Jan', 'Kowalski', '12345678901', 'Cukrzyca', '1');
    };

    window.buttonShow = async function() {
        const patients = await showPatients();
        for(let i = 0; i < patients.length; i++) {
            console.log(patients[i]);
        }
    };

    connectDatabase();                                                  // Wywołanie funkcji połączenia z bazą danych
});

