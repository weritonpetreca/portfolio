/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_API_URL: string;
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  readonly VITE_ENABLE_CLOUDWARDENS?: string;
  readonly VITE_CLOUDWARDENS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
