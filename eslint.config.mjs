import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // verify-connection.js is a standalone CommonJS script for checking Supabase from Node.
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'verify-connection.js']),
]);

export default eslintConfig;
