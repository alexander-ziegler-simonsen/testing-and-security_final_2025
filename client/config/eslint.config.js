import js from "@eslint/js";
import tseslint from "typescript-eslint";
import vue from "eslint-plugin-vue";

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...vue.configs["flat/recommended"], // ← fully compatible with Vue 3.5.x
    {
        files: ["src/**/*.{js,ts,vue}"],
        languageOptions: {
            parser: tseslint.parser,
        },
        rules: {
            // Your custom rules (optional)
        }
    }
];