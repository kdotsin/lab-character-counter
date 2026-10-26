import type { CharacterCounterProps } from "../../types";

export const MIN_WORDS = 25;
export const MAX_WORDS = 100;

export default function CharacterCounter({
  minWords = MIN_WORDS,
  maxWords = MAX_WORDS,
  targetReadingTime,
}: CharacterCounterProps) {
  return (
    <div className="flex flex-col items-center">
      <p>
        Min: {minWords} | Max: {maxWords}
      </p>
      <span>{targetReadingTime}</span>
    </div>
  );
}
