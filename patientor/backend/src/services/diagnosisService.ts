import diagnoses from '../../data/diagnoses';
import { Diagnosis } from '../types/types';

const getDiagnoses = (): Diagnosis[] => {
    return diagnoses;
};

export default {
    getDiagnoses,
};