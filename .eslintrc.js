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
    }],
    "prettier/prettier": [
      "error",
      {
        printWidth: 100,
        trailingComma: "all",
        singleQuote: true,
        proseWrap: "always",
        htmlWhitespaceSensitivity: "ignore",
        jsxBracketSameLine: true,
      },
    ],
  },
  globals: {
    "axios": true,
    "_": true,
    "anime": true
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
