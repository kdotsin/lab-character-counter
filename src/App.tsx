import { useState } from "react";
import TextInput from "./components/TextInput/TextInput"
import type { TextStats } from "./types"
import StatsDisplay from "./components/StatsDisplay/StatsDisplay";
import CharacterCounter from "./components/CharacterCounter/CharacterCounter";

const WORDS_PER_MINUTE = 200;

function getStats(text: string) : TextStats {
  const trimmed = text.trim();
  const wordCount = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
  return {
    characterCount: text.length,
    wordCount,
    readingTime: Math.round((wordCount / WORDS_PER_MINUTE) * 60),
  }
}

function App() {
  const [text, setText] = useState('');
  const stats = getStats(text);
  return (
    <div>
      <TextInput
        onTextChange={setText}
      />
      <StatsDisplay 
        stats={stats}
      />
      <CharacterCounter />
    </div>
  )
}

export default App
