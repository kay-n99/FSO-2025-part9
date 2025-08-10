import { useEffect, useState } from "react";
import type { Diary, NewDiaryEntry } from "./types";
import { getAllDiaries, create } from "./services/diaryService";
import DiaryList from "./components/DiaryList";
import axios from "axios";

const weatherOptions: Diary["weather"][] = [
  "sunny",
  "rainy",
  "cloudy",
  "stormy",
  "windy",
];

const visibilityOptions: Diary["visibility"][] = [
  "great",
  "good",
  "ok",
  "poor",
];

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Diary["weather"]>("sunny");
  const [visibility, setVisibility] = useState<Diary["visibility"]>("great");
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
      weather,
      visibility,
      comment
    };
    try{
      const added = await create(newDiary);
      setDiaries(diaries.concat(added));

      setDate("");
      setWeather("sunny");
      setVisibility("great");
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
          {weatherOptions.map((option) => (
            <label key={option} style={{ marginRight: "0.5em" }}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={() => setWeather(option)}
              />
              {option}
            </label>
          ))}
        </div>

        <div>
          visibility:{" "}
          {visibilityOptions.map((option) => (
            <label key={option} style={{ marginRight: "0.5em" }}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={() => setVisibility(option)}
              />
              {option}
            </label>
          ))}
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
