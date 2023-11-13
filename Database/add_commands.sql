INSERT INTO hospitalward (id_hospital_ward, name) VALUES
  (1, 'Kardiologia'),
  (2, 'Chirurgia Ogólna'),
  (3, 'Pulmonologia'),
  (4, 'Otolaryngologia'),
  (5, 'Ortopedia');
 
INSERT INTO doctor (id_doctor, name, surname, specialization, hospitalward_id_hospital_ward) VALUES
  (1, 'Jan', 'Kowalski', 'Kardiolog', 1),
  (2, 'Anna', 'Nowak', 'Chirurg', 2),
  (3, 'Piotr', 'Zalewski', 'Pulmonolog', 3),
  (4, 'Maria', 'Lis', 'Otolaryngolog', 4),
  (5, 'Tomasz', 'Wójcik', 'Ortopeda', 5);
  
INSERT INTO nurse (id_nurse, name, surname, hospitalward_id_hospital_ward) VALUES
  (1, 'Wioletta', 'Jastrzębska', 1),
  (2, 'Paweł', 'Makowski', 2),
  (3, 'Monika', 'Duda', 3),
  (4, 'Tomasz', 'Kurek', 4),
  (5, 'Anna', 'Kołodziej', 5),
  (6, 'Marcin', 'Olszewski', 1),
  (7, 'Beata', 'Majewska', 2),
  (8, 'Artur', 'Grabowski', 3);
  
INSERT INTO patient (id_patient, name, surname, age, personal_number, disease, hospitalward_id_hospital_ward) VALUES
  (1, 'Alicja', 'Wiśniewska', 35, 123456789, 'Choroba serca', 1),
  (2, 'Marek', 'Kowalczyk', 45, 987654321, 'Złamanie kości piszczelowej', 5),
  (3, 'Ewa', 'Jankowska', 28, 111222333, 'Zapalenie płuc', 3),
  (4, 'Adam', 'Nowak', 55, 555444333, 'Przebyty wylew', 1),
  (5, 'Iwona', 'Lipińska', 40, 111222333, 'Amputacja kończyny górnej', 2),
  (6, 'Rafał', 'Kowal', 32, 987654321, 'Nowotwór płuc', 3),
  (7, 'Katarzyna', 'Szymańska', 25, 222333444, 'Zapalenie ucha środkowego', 4),
  (8, 'Grzegorz', 'Pawlak', 48, 666777888, 'Złamanie kości', 5),
  (9, 'Hanna', 'Kwiatkowska', 60, 999888777, 'Artretyzm', 1),
  (10, 'Jacek', 'Wójcicki', 37, 444555666, 'Astma', 2),
  (11, 'Aleksandra', 'Kaczor', 29, 333222111, 'Pylica', 3),
  (12, 'Dariusz', 'Sikora', 42, 777666555, 'Ciało obce w lewym uchu', 4),
  (13, 'Elżbieta', 'Zielińska', 50, 888999000, 'Przebyty zawał', 1),
  (14, 'Mirosław', 'Borowski', 34, 123987456, 'Astma', 3),
  (15, 'Agnieszka', 'Lewandowska', 27, 789654123, 'Zapalenie wyrostka robaczkowego', 2);