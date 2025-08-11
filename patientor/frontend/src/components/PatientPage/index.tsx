import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import { Patient } from "../../types";
import patientService from "../../services/patients";

const PatientPage = () => {
    const { id } = useParams<{ id: string}>();
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() =>{
        if(id){
            patientService.getById(id).then(data => setPatient(data));
        }
    }, [id]);

    if(!patient) return <div>loading...</div>;

    return (
        <div>
            <h2>{patient.name}</h2>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            
        </div>
    );
};

export default PatientPage;