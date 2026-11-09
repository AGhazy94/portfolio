interface ImportMetaEnv {
  readonly PUBLIC_NOINDEX?: string;
  readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
  readonly PUBLIC_GA_MEASUREMENT_ID?: string;
  readonly PUBLIC_WEBMCP_ORIGIN_TRIAL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// WebMCP declarative attributes: https://developer.chrome.com/docs/ai/webmcp/declarative-api
declare namespace astroHTML.JSX {
  interface FormHTMLAttributes {
    toolname?: string;
    tooldescription?: string;
    toolautosubmit?: boolean;
  }
  interface InputHTMLAttributes {
    toolparamdescription?: string;
  }
  interface SelectHTMLAttributes {
    toolparamdescription?: string;
  }
  interface TextareaHTMLAttributes {
    toolparamdescription?: string;
  }
}
