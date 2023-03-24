Care monitor Programming challenge.
Steps to run the Application : 

i.      Download the db dump file (caremonitor) and import it in the postgres database.
ii.     If import successfully then avoid next step, else
iii.    Create the table using below mentioned query.

CREATE TABLE IF NOT EXISTS measurements.vitals
(
    user_id smallint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 32767 CACHE 1 ),
    heart_rate json,
    CONSTRAINT vitals_pkey PRIMARY KEY (user_id)
)

iv.     Set the proper db credentials into db/connection.js
v.      Unzip the code and open terminal from inside the code folder.
vi.     Run "npm i" to install all the dependencies.
vii.    Now run "npm run start".
viii.    Call the below mentioned API with the payload mentioned in the clinical_metrics.json

POST http://localhost:3000/process.

ix. Check the response.

