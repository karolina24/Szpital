CREATE TABLE doctor (
    id_doctor                     INTEGER NOT NULL,
    name                          VARCHAR(30) NOT NULL,
    surname                       VARCHAR(40) NOT NULL,
    specialization                VARCHAR(40) NOT NULL,
    hospitalward_id_hospital_ward INTEGER NOT NULL,
    PRIMARY KEY (id_doctor),
    FOREIGN KEY (hospitalward_id_hospital_ward) REFERENCES hospitalward (id_hospital_ward)
);

CREATE TABLE hospitalward (
    id_hospital_ward INTEGER NOT NULL,
    name             VARCHAR(40) NOT NULL,
    PRIMARY KEY (id_hospital_ward)
);

CREATE TABLE nurse (
    id_nurse                      INTEGER NOT NULL,
    name                          VARCHAR(30) NOT NULL,
    surname                       VARCHAR(40) NOT NULL,
    hospitalward_id_hospital_ward INTEGER NOT NULL,
    PRIMARY KEY (id_nurse),
    FOREIGN KEY (hospitalward_id_hospital_ward) REFERENCES hospitalward (id_hospital_ward)
);

CREATE TABLE patient (
    id_patient                    INTEGER NOT NULL,
    name                          VARCHAR(30) NOT NULL,
    surname                       VARCHAR(40) NOT NULL,
    age                           INTEGER NOT NULL,
    personal_number               INTEGER NOT NULL,
    disease                       VARCHAR(100) NOT NULL,
    hospitalward_id_hospital_ward INTEGER NOT NULL,
    PRIMARY KEY (id_patient, hospitalward_id_hospital_ward),
    FOREIGN KEY (hospitalward_id_hospital_ward) REFERENCES hospitalward (id_hospital_ward)
);
