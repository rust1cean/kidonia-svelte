import type { LogInPayload, SignUpPayload } from './auth-payload';

export interface AuthService {
  logIn(payload: LogInPayload): Promise<any>;
  logOut(): Promise<void>;
  signUp(payload: SignUpPayload): Promise<any>;
}