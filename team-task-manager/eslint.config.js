import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import hooksPlugin from 'eslint-plugin-react-hooks';

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ...pluginReactConfig,
    languageOptions: {
      ...pluginReactConfig.languageOptions,
      globals: globals.browser,
      parser: tseslint.parser,
    },
    plugins: {
        'react': pluginReactConfig.plugins.react,
        'react-hooks': hooksPlugin,
    },
    rules: {
        ...pluginReactConfig.rules,
        ...hooksPlugin.configs.recommended.rules,
        "react/react-in-jsx-scope": "off",
    }
  },
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist", ".eslintrc.cjs", "eslint.config.js"],
  },
];
