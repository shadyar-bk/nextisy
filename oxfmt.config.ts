import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  ...ultracite,
  ignorePatterns: [...(ultracite.ignorePatterns ?? []), "tools/oxlint/anti-slop/**"],
  jsdoc: true,
  printWidth: 100,
  singleAttributePerLine: true,
  sortPackageJson: {
    sortScripts: true,
  },
  sortTailwindcss: {
    stylesheet: "./src/app/globals.css",
  },
});
