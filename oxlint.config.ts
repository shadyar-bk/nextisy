import { defineConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import core from "ultracite/oxlint/core";
import { jsPluginSettings, selectJsPlugins } from "ultracite/oxlint/js-plugins";
import next from "ultracite/oxlint/next";
import nextJsPlugins from "ultracite/oxlint/next/js-plugins";
import react from "ultracite/oxlint/react";
import vitest from "ultracite/oxlint/vitest";

export default defineConfig({
  extends: [core, react, next, vitest, nextJsPlugins, antiSlop, selectJsPlugins(["react-doctor"])],
  ignorePatterns: core.ignorePatterns,
  jsPlugins: ["oxlint-tailwindcss"],
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
      files: ["src/components/ui/**/*.tsx"],
      rules: {
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/label-has-associated-control": "off",
        "jsx-a11y/no-noninteractive-element-interactions": "off",
        "jsx-a11y/prefer-tag-over-role": "off",
        "react-doctor/only-export-components": "off",
      },
    },
    {
      files: ["e2e/**/*.e2e.ts"],
      rules: {
        "no-await-in-loop": "off",
      },
    },
    {
      files: ["src/components/ui/sidebar.tsx"],
      rules: {
        "tailwindcss/enforce-logical": "off",
      },
    },
  ],
  rules: {
    "func-style": ["error", "declaration", { allowTypeAnnotation: true }],
    "react/function-component-definition": ["error", { namedComponents: "function-declaration" }],
    "react/jsx-no-constructed-context-values": "off",
    "tailwindcss/consistent-variant-order": "warn",
    "tailwindcss/enforce-canonical": "warn",
    "tailwindcss/enforce-consistent-important-position": "warn",
    "tailwindcss/enforce-consistent-line-wrapping": "off",
    "tailwindcss/enforce-consistent-variable-syntax": "warn",
    "tailwindcss/enforce-logical": "warn",
    "tailwindcss/enforce-negative-arbitrary-values": "warn",
    "tailwindcss/enforce-physical": "off",
    "tailwindcss/enforce-shorthand": "warn",
    "tailwindcss/enforce-sort-order": "warn",
    "tailwindcss/max-class-count": "off",
    "tailwindcss/no-arbitrary-value": "off",
    "tailwindcss/no-conflicting-classes": "error",
    "tailwindcss/no-contradicting-variants": "warn",
    "tailwindcss/no-dark-without-light": "warn",
    "tailwindcss/no-deprecated-classes": "error",
    "tailwindcss/no-duplicate-classes": "error",
    "tailwindcss/no-hardcoded-colors": "warn",
    "tailwindcss/no-restricted-classes": "off",
    "tailwindcss/no-unknown-classes": "error",
    "tailwindcss/no-unnecessary-arbitrary-value": "warn",
    "tailwindcss/no-unnecessary-whitespace": "error",
    "tailwindcss/prefer-scale-token": "off",
    "tailwindcss/prefer-theme-tokens": "off",
  },
  settings: {
    ...jsPluginSettings,
    tailwindcss: {
      entryPoint: "src/app/globals.css",
    },
  },
});
