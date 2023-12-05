declare module 'express-session' {
  interface SessionData {
    user: { id: string; email: string; role: string; disabled: boolean; name: string };
  }
}

export {};
