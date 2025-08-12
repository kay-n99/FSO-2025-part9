import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import { Patient, Diagnosis } from "../../types";
import EntryDetails from "../EntryDetails";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      patientService.getById(id).then((data) => setPatient(data));
    }
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>

      <h3>Entries</h3>
      {patient.entries.length === 0 && <p>No entries found.</p>}
      {patient.entries.map((entry) => (
        <div key={entry.id}>
          <EntryDetails entry={entry} />
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => {
                const diag = diagnoses.find((d) => d.code === code);
                return (
                  <li key={code}>
                    {code} {diag ? `– ${diag.name}` : ""}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
