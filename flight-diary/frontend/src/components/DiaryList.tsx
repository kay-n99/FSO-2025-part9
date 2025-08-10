import type { Diary } from "../types";

interface Props {
    diaries: Diary[];
}

const DiaryList = ({ diaries }: Props) => {
    return (
        <div>
            <h2>Flight Diaries</h2>
            {diaries.map((d) => (
                <div key={d.id} style={{marginBottom: "1em"}}>
                    <strong>{d.date}</strong>
                    <div>Visibility: {d.visibility}</div>
                    <div>Weather: {d.weather}</div>
                    {d.comment && <em>Comment: {d.comment}</em>}    
                </div>
            ))}
        </div>
    );
};

export default DiaryList;