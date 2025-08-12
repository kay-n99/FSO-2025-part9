import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";
import { Diagnosis } from "../../types";

interface Props {
  patientId: string;
  onSubmit: (formData: any) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [type, setType] = useState<
    "Hospital" | "OccupationalHealthcare" | "HealthCheck"
  >("HealthCheck");

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const [healthCheckRating, setHealthCheckRating] = useState(0);

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const res = await fetch("http://localhost:3001/api/diagnoses");
      const data: Diagnosis[] = await res.json();
      setDiagnoses(data);
    };
    fetchDiagnoses();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    let entryData: any = {
      date,
      specialist,
      description,
      diagnosisCodes,
      type,
    };

    if (type === "Hospital") {
      entryData.discharge = {
        date: dischargeDate,
        criteria: dischargeCriteria,
      };
    }

    if (type === "OccupationalHealthcare") {
      entryData.employerName = employerName;
      if (sickLeaveStartDate && sickLeaveEndDate) {
        entryData.sickLeave = {
          startDate: sickLeaveStartDate,
          endDate: sickLeaveEndDate,
        };
      }
    }

    if (type === "HealthCheck") {
      entryData.healthCheckRating = Number(healthCheckRating);
    }

    onSubmit(entryData);
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: "1rem" }}>
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        required
      />

      <TextField
        label="Specialist"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        required
      />

      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <FormControl>
        <InputLabel id="diagnosis-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnosis-label"
          multiple
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCodes(e.target.value as string[])}
          renderValue={(selected) => (selected as string[]).join(", ")}
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              <Checkbox checked={diagnosisCodes.indexOf(d.code) > -1} />
              <ListItemText primary={`${d.code} — ${d.name}`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          required
        >
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare
          </MenuItem>
        </Select>
      </FormControl>

      {type === "Hospital" && (
        <>
          <TextField
            label="Discharge Date"
            type="date"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Discharge Criteria"
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)}
            required
          />
        </>
      )}

      {type === "OccupationalHealthcare" && (
        <>
          <TextField
            label="Employer Name"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            required
          />
          <TextField
            label="Sick Leave Start Date"
            type="date"
            value={sickLeaveStartDate}
            onChange={(e) => setSickLeaveStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Sick Leave End Date"
            type="date"
            value={sickLeaveEndDate}
            onChange={(e) => setSickLeaveEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </>
      )}

      {type === "HealthCheck" && (
        <FormControl>
          <InputLabel id="rating-label">Health Check Rating</InputLabel>
          <Select
            labelId="rating-label"
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(Number(e.target.value))}
          >
            {[0, 1, 2, 3].map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <div style={{ display: "flex", gap: "1rem" }}>
        <Button type="submit" variant="contained" color="primary">
          Add Entry
        </Button>
        <Button onClick={onCancel} variant="outlined" color="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddEntryForm;
