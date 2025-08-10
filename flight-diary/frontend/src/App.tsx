import { useEffect, useState } from "react";
import type { Diary, NewDiaryEntry } from "./types";
import { getAllDiaries, create } from "./services/diaryService";
import DiaryList from "./components/DiaryList";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const addDiary = async (event: React.FormEvent) => {
    event.preventDefault();
    const newDiary: NewDiaryEntry = {
      date,
      weather: weather as Diary["weather"],
      visibility: visibility as Diary["visibility"],
      comment,
    };
    try{
      const added = await create(newDiary);
      setDiaries(diaries.concat(added));

      setDate("");
      setWeather("");
      setVisibility("");
      setComment("");
      setError(null);
    }catch(e){
      if(axios.isAxiosError(e)){
        if(e.response){
          setError(e.response.data);
        }else{
          setError("No response from server");
        }
      }else{
        setError("Unknown error occured");
      }
    }
    
  };

  return (
    <div>
      <h1>Flight Diary</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={addDiary}>
        <div>
          date:{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          weather:{" "}
          <input value={weather} onChange={(e) => setWeather(e.target.value)} />
        </div>
        <div>
          visibility:{" "}
          <input
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div>
          comment:{" "}
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
