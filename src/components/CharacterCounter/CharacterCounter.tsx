import type { CharacterCounterProps } from "../../types";

export default function CharacterCounter({
  minWords = 25,
  maxWords = 100,
  targetReadingTime,
}: CharacterCounterProps) {
  return (
    <div className="flex flex-col items-center">
      <p>
        `Min: {minWords} | Max: {maxWords}`
      </p>
      <span>{targetReadingTime}</span>
    </div>
  );
}
