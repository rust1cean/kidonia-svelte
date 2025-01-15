import type { LogInPayload, SignUpPayload } from './payload';

export interface AuthService {
  logIn(payload: LogInPayload): Promise<void>;
  logOut(): Promise<void>;
  signUp(payload: SignUpPayload): Promise<void>;
}
