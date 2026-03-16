import globals from "globals"
import pluginJs from "@eslint/js"


export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      // sourceType: "script",
      sourceType: "module"
    }
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  pluginJs.configs.recommended,
]