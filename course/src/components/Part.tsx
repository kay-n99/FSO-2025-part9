import { CoursePart } from "../types";

const assertNever = (value: never): never => {
    throw new Error(`unhandled course part type: ${JSON.stringify(value)}`);
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises) <br />
          {part.description}
        </p>
      );
    case "group":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises) <br />
          Project exercises: {part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises) <br />
          {part.description} <br />
          Background material:{" "}
          <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
        </p>
      );
    case "special":
      return (
        <p>
          <strong>{part.name}</strong> ({part.exerciseCount} exercises) <br />
          {part.description} <br />
          Required skills: {part.requirements.join(", ")}
        </p>
      );
    default:
      return assertNever(part);
  }
};

export default Part;