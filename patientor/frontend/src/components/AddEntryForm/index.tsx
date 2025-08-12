import React, { useState } from 'react';

interface Props {
    patientId: string;
    onSubmit: (formData: any) => void;
    onCancel: () => void;
}

const AddEntryForm = ({ patientId, onSubmit, onCancel }: Props) => {
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [description, setDescription] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');
    const [type, setType] = useState('HealthCheck');
    const [healthCheckRating, setHealthCheckRating] = useState('');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const diagnosisCodesArray = diagnosisCodes
            .split(', ')
            .map(code => code.trim())
            .filter(code => code.length > 0);

        onSubmit({
            date, 
            specialist,
            description,
            diagnosisCodes: diagnosisCodesArray,
            type,
            healthCheckRating: Number(healthCheckRating) || 0,
        });
    };

    return (
    <form onSubmit={submit}>
      <div>
        <label>Date: </label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      </div>
      <div>
        <label>Specialist: </label>
        <input type="text" value={specialist} onChange={e => setSpecialist(e.target.value)} required />
      </div>
      <div>
        <label>Description: </label>
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Diagnosis Codes (comma separated): </label>
        <input type="text" value={diagnosisCodes} onChange={e => setDiagnosisCodes(e.target.value)} />
      </div>
      <div>
        <label>Health Check Rating (0-3): </label>
        <input
          type="number"
          min={0}
          max={3}
          value={healthCheckRating}
          onChange={e => setHealthCheckRating(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Entry</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default AddEntryForm;