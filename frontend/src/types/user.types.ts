export interface PublicUser {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
}

export interface AuthResponse {
  user: PublicUser;
  token: string;
}