import { useEffect, useState } from "react";
import type { Diary } from "./types";
import { getAllDiaries } from "./services/diaryService";
import DiaryList from "./components/DiaryList";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <h1>Flight Diary</h1>
      <DiaryList diaries={diaries} />
    </div>
  )
}

export default App;