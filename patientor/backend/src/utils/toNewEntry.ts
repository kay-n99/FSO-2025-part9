import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating } from '../types/types';
import { v4 as uuid} from 'uuid';
import { parseDiagnosisCodes } from './utils';

const toNewEntry = (object:any): Entry => {
    if(!object.type || typeof object.type !== 'string'){
        throw new Error('Missing or invalid entry type');
    }

    const baseEntry = {
        id: uuid(),
        date: parseDate(object.date),
        description: parseString(object.description),
        specialist: parseString(object.specialist),
        

    }
}