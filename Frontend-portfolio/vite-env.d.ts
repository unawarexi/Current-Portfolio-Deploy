/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string; // Add all the environment variables you plan to use
    // More environment variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  