import type { CharacterCounterProps } from "../../types";

export default function CharacterCounter({
  minWords = 25,
  maxWords = 100,
  targetReadingTime,
}: CharacterCounterProps) {
  return (
    <div className="flex flex-col items-center">
      <p data-min={minWords} data-max={maxWords}>
        `Min: {minWords} | Max: {maxWords}`
      </p>
      <span>{targetReadingTime}</span>
    </div>
  );
}
