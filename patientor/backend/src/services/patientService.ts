import patients from '../../data/patients';
import { Patient } from '../types/types';

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getNonSensitivePatients
}