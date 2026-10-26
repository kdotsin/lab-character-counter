# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.


1. How did you handle state updates when the text changed?

App holds a single piece of state, text, and TextInput updates it through onTextChange. The stats are derived from text on every render by getStats(text) rather than stored in a second useState. That keeps them from drifting out of sync with the text and removes any need for effects or extra update logic. StatsDisplay is a pure presentational component that receives stats as a prop.

2. What considerations did you make when calculating reading time?

I used a fixed average of 200 words per minute. That’s a common estimate, not a precise one, so it’s a named constant that’s easy to change.
I stored the result as total seconds (a number, matching TextStats) and format it as m:ss only at display time. Keeping the data numeric and the formatting in the UI layer meant the types didn’t have to change.
I multiplied before rounding: Math.round((wordCount / WORDS_PER_MINUTE) * 60). Rounding to whole minutes first would make the display jump in 60-second steps.
The empty case works naturally, since 0 words gives 0:00.

3. How did you ensure the UI remained responsive during rapid text input?

I didn’t add any explicit optimization, and I wouldn’t claim otherwise. The work per keystroke is one trim, one regex split, and a few arithmetic operations, which is linear in text length and negligible for typical input. StatsDisplay is also cheap to re-render. If very large pastes ever became a problem, the options would be useMemo on getStats, useDeferredValue on text, or counting words with a regex match instead of building an array. I’d measure first before adding any of them.

4. What challenges did you face when implementing the statistics calculations?

The empty-string edge case: "".split(/\s+/) returns [""], which has length 1. The trimmed === "" ? 0 : ... guard fixes that.
Whitespace handling: trim() plus /\s+/ handles leading, trailing, and repeated spaces, tabs, and newlines. A plain split(" ") would inflate the count.
Operation order in reading time: I rounded before converting to seconds, which produced coarse minute-sized jumps until I reordered it.
Sharing the min/max limits: StatsDisplay and CharacterCounter needed the same constants, which forced a decision about where they live. They’re exported from CharacterCounter for now. A separate constants.ts would be cleaner.
Known limitation: \s splitting treats hello-world as one word, so counts can differ slightly from tools like Word.