import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import { Favorite, Work, LocalHospital, MedicalServices } from "@mui/icons-material";

interface EntryDetailsProps {
    entry: Entry;
}

const assertNever = (value: never): never => {
    throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const EntryDetails = ({ entry }: EntryDetailsProps) => {
    switch(entry.type){
        case "Hospital":
            return (
                <div style={{ border: "1px solid gray", padding: "0.5 rem", marginBottom: "0.5 rem"}}>
                    <p>
                        <strong>{entry.date}</strong><LocalHospital /> <br />
                        {entry.description}
                    </p>
                    <p>
                        Discharge: { entry.discharge.date} - {entry.discharge.criteria}
                    </p>
                </div>
            );
        case "OccupationalHealthcare":
            return (
        <div style={{ border: "1px solid gray", padding: "0.5rem", marginBottom: "0.5rem" }}>
          <p>
            <strong>{entry.date}</strong> <Work /> {entry.employerName}
          </p>
          <p>{entry.description}</p>
          {entry.sickLeave && (
            <p>
              Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
            </p>
          )}
        </div>
      );
      case "HealthCheck":
      return (
        <div style={{ border: "1px solid gray", padding: "0.5rem", marginBottom: "0.5rem" }}>
          <p>
            <strong>{entry.date}</strong> <MedicalServices />
          </p>
          <p>{entry.description}</p>
          <p>Health rating: <Favorite style={{ color: healthCheckColor(entry.healthCheckRating) }} /></p>
        </div>
      );
    default:
      return assertNever(entry);

    }
};

const healthCheckColor = ( rating: number): string => {
    switch(rating){
        case 0: return "green";
        case 1: return "yellow";
        case 2: return "orange";
        case 3: return "red";
        default: return "gray";
    }
};

export default EntryDetails;