import patients from '../../data/patients';
import { Patient, NewPatient, NonSensitivePatient, Entry } from '../types/types';
import { v1 as uuid } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        entries: [],
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const addEntry = (id: string, entry: Entry): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    if(!patient){
        throw new Error('Patient not found');
    }
    patient.entries.push(entry);
    return patient;
};

export default {
    getNonSensitivePatients,
    addPatient,
    getPatient,
    addEntry
}