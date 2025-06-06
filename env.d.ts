// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT?: string;
    readonly SESSION_SECRET?: string;
    readonly MONGO_URI?: string;
    readonly GOOGLE_CLIENT_ID?: string;
    readonly GOOGLE_CLIENT_SECRET?: string;
    readonly GOOGLE_CALLBACK_URL?: string;
    readonly GITHUB_CLIENT_ID?: string;
    readonly GITHUB_CLIENT_SECRET?: string;
    readonly GITHUB_CALLBACK_URL?: string;
    //readonly NODE_ENV?: 'development' | 'production';
  }
}
