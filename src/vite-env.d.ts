// src/env.d.ts or vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_DOMAIN_URL: string; 
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
