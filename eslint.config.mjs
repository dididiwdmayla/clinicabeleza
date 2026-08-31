import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([
    ".next/**",
    "out/**",
    "dist/**",
    "next-env.d.ts",
    "generate-item0-png.cjs",
    "item0-*.cjs",
    "item01-*.cjs",
    "upload/**",
  ]),
]);
