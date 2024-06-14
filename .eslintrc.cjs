module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "./.eslintrc-auto-import.json"
  ],
  plugins: ["vue", "@typescript-eslint", "prettier", "import"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true,
      tsx: true
    }
  },
  rules: {
    // TS
    "@typescript-eslint/no-explicit-any": "off",
    "no-debugger": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }
    ],
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }
    ],
    // Vue
    "vue/no-v-html": "off",
    "vue/require-default-prop": "off",
    "vue/require-explicit-emits": "off",
    "vue/multi-word-component-names": "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always"
        },
        svg: "always",
        math: "always"
      }
    ],
    // 配置import模块进行分组
    "import/no-unresolved": [2, { commonjs: true, amd: true }],
    "import/no-named-as-default-member": 0,
    "import/order": [
      "error",
      {
        groups: [["builtin", "external"], "internal", "parent", "sibling", "index"],
        "newlines-between": "never",
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        },
        pathGroups: [
          {
            pattern: "{vue,vue-router,vuex}",
            group: "builtin",
            position: "before"
          },
          {
            pattern: "@/**",
            group: "internal",
            position: "before"
          },
          {
            pattern: "*.vue",
            group: "internal",
            position: "before"
          }
        ],
        pathGroupsExcludedImportTypes: ["builtin"]
      }
    ],
    // Prettier
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ]
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: "tsconfig.json"
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".d.ts", ".tsx"],
        paths: ["src"]
      }
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".d.ts", ".tsx"]
    },
    vue: {
      version: "detect"
    }
  }
}
