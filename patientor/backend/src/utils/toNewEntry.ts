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
        diagnosisCodes: parseDiagnosisCodes(object)
    };

    switch(object.type) {
        case "Hospital":
            return {
                ...baseEntry,
                type: "Hospital",
                discharge: {
                    date: parseDate(object.discharge.date),
                    criteria: parseString(object.discharge.criteria)
                }
            } as HospitalEntry;
        
        case "OccupationalHealthcare":
            return {
                ...baseEntry,
                type: "OccupationalHealthcare",
                employerName: parseString(object.employerName),
                sickLeave: object.sickLeave
                ? {
                    startDate: parseDate(object.sickLeave.startDate),
                    endDate: parseDate(object.sickLeave.endDate)
                    }
                : undefined
            } as OccupationalHealthcareEntry;
        
        case "HealthCheck":
            return {
                ...baseEntry,
                type: "HealthCheck",
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            } as HealthCheckEntry;

        
        default:
            throw new Error(`Unhandled entry type: ${object.type}`);
    }
};

const parseString = (text: unknown): string => {
    if (!text || typeof text !== 'string'){
        throw new Error('Invalid or missing string field');
    }
    return text;
};

const parseDate = (date: unknown): string => {
    if(!date || typeof date !== 'string' || !Boolean(Date.parse(date))){
        throw new Error('Invalid or missing date');
    }
    return date;
};

const parseHealthCheckRating = (param: unknown): HealthCheckRating => {
    if(typeof param !== 'number' || !Object.values(HealthCheckRating).includes(param)){
        throw new Error('Invalid health check rating');
    }
    return param;
};

export default toNewEntry;