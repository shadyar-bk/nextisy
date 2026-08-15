import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import jsPlugins from "ultracite/oxlint/js-plugins";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";
import vitest from "ultracite/oxlint/vitest";

const jsPluginsWithTailwind = {
  ...jsPlugins,
  jsPlugins: [...(jsPlugins.jsPlugins ?? []), "oxlint-tailwindcss"],
};

export default defineConfig({
  extends: [core, react, next, vitest, jsPluginsWithTailwind],
  ignorePatterns: [
    ...(core.ignorePatterns ?? []),
    ".agent/**",
    ".agents/**",
    ".claude/**",
    ".codex/**",
    ".continue/**",
    ".cursor/**",
    ".gemini/**",
    ".opencode/**",
    ".pi/**",
    ".roo/**",
    ".windsurf/**",
    "tools/oxlint/anti-slop/**",
  ],
  jsPlugins: [{ name: "anti-slop", specifier: "./tools/oxlint/anti-slop/index.ts" }],
  options: {
    reportUnusedDisableDirectives: "warn",
    respectEslintDisableDirectives: true,
    typeAware: true,
    typeCheck: true,
  },
  overrides: [
    {
      files: ["src/**/*.ts", "src/**/*.tsx"],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            patterns: [
              {
                message: "Use the @/ alias instead of a relative import.",
                regex: "^\\.{1,2}/",
              },
            ],
          },
        ],
      },
    },
    {
      // shadcn components intentionally co-export their variant definitions for composition.
      files: ["src/components/ui/**/*.tsx"],
      rules: {
        "react-doctor/only-export-components": "off",
      },
    },
    {
      // Next.js App Router files intentionally co-export metadata, handlers, and route config.
      files: ["src/app/**/*.ts", "src/app/**/*.tsx"],
      rules: {
        "react-doctor/only-export-components": "off",
      },
    },
    {
      // Sidebar `side="left|right"` values select physical viewport edges in both directions.
      files: ["src/components/ui/sidebar.tsx"],
      rules: {
        "tailwindcss/enforce-logical": "off",
      },
    },
  ],
  rules: {
    "anti-slop/no-chained-type-assertions": "error",
    "anti-slop/no-conditional-empty-object-spread": "error",
    "anti-slop/no-known-value-widening": "error",
    "anti-slop/no-module-mocking": "error",
    "anti-slop/no-object-parameters": "error",
    "anti-slop/no-reflect-apply": "error",
    "anti-slop/no-reflect-get": "error",
    "anti-slop/no-runtime-typeof": "error",
    "anti-slop/no-shape-in-symbol-names": "error",
    "anti-slop/no-unknown-parameters": "error",
    "anti-slop/no-unknown-returns": "error",
    "anti-slop/no-unknown-type-aliases": "error",
    "anti-slop/no-unsafe-dictionary-type": "error",
    "anti-slop/no-widen-then-assert": "error",
    "anti-slop/require-safety-comment-for-type-assertion": "error",
    "func-style": ["error", "declaration", { allowTypeAnnotation: true }],
    "prefer-arrow-callback": "error",
    // React Compiler stabilizes provider values without manual useMemo calls.
    "react/jsx-no-constructed-context-values": "off",
    // Next.js HTTP exports and React components require names this generic rule rejects.
    "sonarjs/function-name": "off",
    "tailwindcss/consistent-variant-order": "warn",
    "tailwindcss/enforce-canonical": "warn",
    "tailwindcss/enforce-consistent-important-position": "warn",
    "tailwindcss/enforce-consistent-variable-syntax": "warn",
    "tailwindcss/enforce-logical": "error",
    "tailwindcss/enforce-negative-arbitrary-values": "warn",
    "tailwindcss/enforce-shorthand": "warn",
    "tailwindcss/enforce-sort-order": "warn",
    "tailwindcss/no-conflicting-classes": "error",
    "tailwindcss/no-contradicting-variants": "warn",
    "tailwindcss/no-dark-without-light": "warn",
    "tailwindcss/no-deprecated-classes": "error",
    "tailwindcss/no-duplicate-classes": "error",
    "tailwindcss/no-hardcoded-colors": "warn",
    "tailwindcss/no-unknown-classes": [
      "error",
      {
        ignorePrefixes: ["group/", "peer/"],
      },
    ],
    "tailwindcss/no-unnecessary-arbitrary-value": "warn",
    "tailwindcss/no-unnecessary-whitespace": "error",
    "tailwindcss/prefer-scale-token": "warn",
  },
  settings: {
    tailwindcss: {
      entryPoint: "src/app/globals.css",
    },
  },
});
