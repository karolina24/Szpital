CREATE TABLE doctor (
    id_doctor                     INTEGER NOT NULL,
    name                          VARCHAR2(30) NOT NULL,
    surname                       VARCHAR2(40) NOT NULL,
    specialization                VARCHAR2(40) NOT NULL,
    hospitalward_id_hospital_ward INTEGER NOT NULL
);

CREATE UNIQUE INDEX doctor__idx ON
    doctor (
        hospitalward_id_hospital_ward
    ASC );

ALTER TABLE doctor ADD CONSTRAINT doctor_pk PRIMARY KEY ( id_doctor );

CREATE TABLE hospitalward (
    id_hospital_ward INTEGER NOT NULL,
    name             VARCHAR2(40) NOT NULL,
    doctor_id_doctor INTEGER NOT NULL
);

CREATE UNIQUE INDEX hospitalward__idx ON
    hospitalward (
        doctor_id_doctor
    ASC );

ALTER TABLE hospitalward ADD CONSTRAINT hospitalward_pk PRIMARY KEY ( id_hospital_ward );

CREATE TABLE nurse (
    id_nurse                      INTEGER NOT NULL,
    name                          VARCHAR2(30) NOT NULL,
    surname                       VARCHAR2(40) NOT NULL,
    hospitalward_id_hospital_ward INTEGER NOT NULL
);

ALTER TABLE nurse ADD CONSTRAINT nurse_pk PRIMARY KEY ( id_nurse );

CREATE TABLE patient (
    id_patient                    INTEGER NOT NULL,
    name                          VARCHAR2(30) NOT NULL,
    surname                       VARCHAR2(40) NOT NULL,
    age                           INTEGER NOT NULL,
    personal_number               INTEGER NOT NULL,
    disease                       VARCHAR2(100) NOT NULL,
    hospitalward_id_hospital_ward INTEGER NOT NULL
);

ALTER TABLE patient ADD CONSTRAINT patient_pk PRIMARY KEY ( id_patient,
                                                            hospitalward_id_hospital_ward );

ALTER TABLE doctor
    ADD CONSTRAINT doctor_hospitalward_fk FOREIGN KEY ( hospitalward_id_hospital_ward )
        REFERENCES hospitalward ( id_hospital_ward );

ALTER TABLE hospitalward
    ADD CONSTRAINT hospitalward_doctor_fk FOREIGN KEY ( doctor_id_doctor )
        REFERENCES doctor ( id_doctor );

ALTER TABLE nurse
    ADD CONSTRAINT nurse_hospitalward_fk FOREIGN KEY ( hospitalward_id_hospital_ward )
        REFERENCES hospitalward ( id_hospital_ward );

ALTER TABLE patient
    ADD CONSTRAINT patient_hospitalward_fk FOREIGN KEY ( hospitalward_id_hospital_ward )
        REFERENCES hospitalward ( id_hospital_ward );
