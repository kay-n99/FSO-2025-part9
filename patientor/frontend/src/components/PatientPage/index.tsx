import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import { Patient } from "../../types";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      patientService.getById(id).then(data => setPatient(data));
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
      <ul>
        {patient.entries.map(entry => (
          <li key={entry.id}>
            <strong>{entry.date}</strong> – {entry.description}
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map(code => (
                  <li key={code}>{code}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientPage;
