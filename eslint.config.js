import vue from "eslint-plugin-vue";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  ...vue.configs["flat/recommended"],
  prettier,
  {
    files: ["**/*.vue", "**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "vue/multi-word-component-names": "off", // Отключаем требования к имени компонента из нескольких слов
      "vue/require-default-prop": "off" // Не требовать указания обязательных свойств
    },
    env: {
      browser: true, //  Если eslint ругается на то, что console.log(), fetch() , URLSearchParams() is undefined
    }
  }
];