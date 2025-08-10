import axios from "axios";
import type { Diary, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3001/api/diaries";

export const getAllDiaries = async (): Promise<Diary[]> => {
    const response = await axios.get<Diary[]>(baseUrl);
    return response.data;
}

export const create = async (newDiary: NewDiaryEntry): Promise<Diary> => {
  const { data } = await axios.post<Diary>(baseUrl, newDiary);
  return data;
};