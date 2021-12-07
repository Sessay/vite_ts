module.exports = {
  "root": true,
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    // "plugin:vue/essential",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended"
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "ecmaVersion": 13,
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "plugins": [
    "vue",
    "@typescript-eslint"
  ],
  "globals": {
    "defineProps": "readonly",
    "defineEmits": "readonly",
    "defineExpose": "readonly",
    "withDefaults": "readonly"
  },
  "rules": {
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "always",
        "normal": "never",
        "component": "always"
      },
      "svg": "always",
      "math": "always"
    }],
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 4
      },      
      "multiline": {
        "max": 4
      }
    }],
    "vue/singleline-html-element-content-newline": ["error", {
      "ignoreWhenNoAttributes": true,
      "ignoreWhenEmpty": true,
      "ignores": ["pre", "textarea", "button", "input"]
    }],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "func-call-spacing": ["error", "never"],
    "no-constant-condition": "warn",
    "no-empty": "warn"
  }
};
