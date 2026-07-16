export interface User {
  id: string;
  email: string;
  password_hash: string;
  name: string | null;
  created_at: Date;
}

// Safe shape returned to clients — never expose password_hash
export interface PublicUser {
  id: string;
  email: string;
  name: string | null;
  created_at: Date;
}

export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
}