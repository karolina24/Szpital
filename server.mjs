import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import sqlite3 from 'sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databasePath = path.join(__dirname, 'Database', 'hospital_database.db');

const app = express();
const port = process.env.PORT || 3000;

let db = null;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/Graphics', express.static(path.join(__dirname, '/Graphics')));


// Routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ustawienie typu MIME dla plików CSS
app.get('/styles.css', (req, res) => {
  res.set('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, 'public', 'styles.css'));
});

// Serwowanie pliku skrypt.js z folderu "JavaScript" w głównym folderze projektu
app.get('/script.mjs', (req, res) => {
  res.sendFile(path.join(__dirname, 'javascript', 'script.mjs'));
});

app.get('/api/connect', (req, res) => {
  db = new sqlite3.Database(databasePath, (err) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json({ message: 'Connected to the database successfully!' });
    }
  });
});

app.post('/api/add-patient', (req, res) => {
  const { name, surname, age, personal_number, disease, hospital_ward } = req.body;
  db.all('SELECT COUNT(*) FROM patient', (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }

    else {
      db.run(`INSERT INTO patient (id_patient, name, surname, age, personal_number, disease, hospitalward_id_hospital_ward)
              VALUES (?, ?, ?, ?, ?, ?, ?)`, [result[0]['COUNT(*)'] + 1, name, surname, age, personal_number, disease, hospital_ward], (err) => {
        if (err) {
          res.status(500).json({ message: err.message });
          return;
        }
        
        else {
          res.json({ message: 'Patient was added!' });
        }
      });
    }
  });
});

app.post('/api/delete-patient', (req, res) => {
  const { patient } = req.body;
  db.run('DELETE FROM patient WHERE personal_number = ?', [patient], (err) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    else {
      res.json({ message: 'Patient was deleted!' });
    }
  });
});

app.get('/api/select-patients', (req, res) => {
  db.all(`SELECT patient.id_patient, patient.name, patient.surname, patient.age, patient.personal_number, patient.disease, hospitalward.name
          AS hospital_ward
          FROM patient
          JOIN hospitalward
          ON patient.hospitalward_id_hospital_ward = hospitalward.id_hospital_ward`, (err, rows) => {
        if (err) {
          res.status(500).json({ message: err.message });
          return;
        }
        
        res.json({ message: rows });
  });
});

app.get('/api/select-doctors', (req, res) => {
  db.all(`SELECT doctor.id_doctor, doctor.name, doctor.surname, doctor.specialization, hospitalward.name
          AS hospital_ward
          FROM doctor
          JOIN hospitalward
          ON doctor.hospitalward_id_hospital_ward = hospitalward.id_hospital_ward`, (err, rows) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    
    res.json({ message: rows });
  });
});

app.get('/api/select-nurses', (req, res) => {
  db.all(`SELECT nurse.id_nurse, nurse.name, nurse.surname, hospitalward.name
          AS hospital_ward
          FROM nurse
          JOIN hospitalward
          ON nurse.hospitalward_id_hospital_ward = hospitalward.id_hospital_ward`, (err, rows) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    
      res.json({ message: rows });
  });
});

app.post('/api/select-ward', (req, res) => {
  const { hospitalWard } = req.body;
  
  const data = {
    patients: [],
    nurses: [],
    doctors: [],
  };

  db.all(`SELECT name, surname, age, personal_number, disease
          FROM patient
          WHERE hospitalward_id_hospital_ward = ?`, [hospitalWard], (err, patientRows) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    
    data.patients = patientRows;

    db.all(`SELECT name, surname
            FROM nurse
            WHERE hospitalward_id_hospital_ward = ?`, [hospitalWard], (err, nurseRows) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      
      data.nurses = nurseRows;

      db.all(`SELECT name, surname, specialization
              FROM doctor
              WHERE hospitalward_id_hospital_ward = ?`, [hospitalWard], (err, doctorRows) => {
        if (err) {
          res.status(500).json({ message: err.message });
          return;
        }
        
        data.doctors = doctorRows;

        res.json({ message: data });
      });
    });
  });
});

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
