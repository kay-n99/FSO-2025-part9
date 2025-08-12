import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import { Patient, Diagnosis } from "../../types";
import EntryDetails from "../EntryDetails";
import AddEntryForm from "../AddEntryForm";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      patientService.getById(id).then((data) => setPatient(data))
      .catch(() => setError('Could not find patient'));
    }
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const addEntry = async (entryData: any) => {
    if (!id) return;

    try{
      const updatedPatient = await patientService.addEntry(id, entryData);
      setPatient(updatedPatient);
      setShowForm(false);
      setError(null);
    } catch(e: unknown){
      if(e instanceof Error) {
        setError(e.message);
      }else{
        setError('Something went wrong');
      }
    }
  };

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>


      {!showForm && (
        <button onClick={() => setShowForm(true)}>Add New Entry</button>
      )}

      {showForm && (
        <AddEntryForm
          patientId={patient.id}
          onSubmit={addEntry}
          onCancel={() => setShowForm(false)} />
      )}
      {error && <p style={{color: 'red'}}>{error}</p>}
      
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
