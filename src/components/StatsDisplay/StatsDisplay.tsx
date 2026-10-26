import type { StatsDisplayProps } from "../../types";
import { MAX_WORDS, MIN_WORDS } from "../CharacterCounter/CharacterCounter";

export default function StatsDisplay({
  stats,
  showReadingTime = true,
}: StatsDisplayProps) {
  function formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  const isOutOfRange =
    stats.wordCount < MIN_WORDS || stats.wordCount > MAX_WORDS;
  return (
    <div className="flex items-center justify-center gap-6">
      <section className="flex flex-col justify-center items-center">
        <h2>Characters</h2>
        <span>{stats.characterCount}</span>
      </section>

      <section className="flex flex-col justify-center items-center">
        <h2>Words</h2>
        <span className={isOutOfRange ? "text-red-600" : undefined}>
          {stats.wordCount}
        </span>
      </section>

      {showReadingTime && (
        <section className="flex flex-col justify-center items-center">
          <h2>Reading Time</h2>
          <span>{formatTime(stats.readingTime)}</span>
        </section>
      )}
    </div>
  );
}
