module.exports = {
  root: true,

  env: {
    node: true,
    browser: true,
  },

  extends: [
    "plugin:vue/recommended",
    "eslint:recommended",
    "prettier/vue",
    "plugin:prettier/recommended",
    "plugin:vue/essential",
    "@vue/prettier",
  ],

  rules: {
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "never"
    }],
    "prettier/prettier": [
      "error",
      {
        printWidth: 100,
        trailingComma: "es5",
        singleQuote: true,
        proseWrap: "never",
        htmlWhitespaceSensitivity: "ignore",
        jsxBracketSameLine: true,
        endOfLine: "crlf",
        disableLanguages: ["html"],
      },
    ],
  },

  parserOptions: {
    parser: "babel-eslint",
  },



  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        mocha: true,
      },
    },
  ],
};
