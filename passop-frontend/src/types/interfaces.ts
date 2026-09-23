export interface AuthResponse {
  token: string;
  vault_id: string;
  message?: string;
}

export interface PasswordEntry {
  id: string;
  vault_id: string;
  website_name: string;
  website_url?: string | null;
  username: string;
  encrypted_password: string;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DecryptedEntry extends PasswordEntry {
  plaintextPassword?: string;
  decryptionError?: boolean;
}

export interface SuccessResponse {
  message: string;
  entry_id?: string;
  user_id?: string;
  vault_id?: string;
}

export interface LoginInputs {
  email: string;
  password: string;
}

export interface RegisterInputs {
  email: string;
  password: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  cryptoKey: CryptoKey | null;
  registerUser: (email: string, masterPassword: string) => Promise<void>;
  login: (email: string, masterPassword: string) => Promise<void>;
  logout: () => void;
}

export interface Inputs {
  _id: string;
  siteName: string;
  siteURL: string;
  username: string;
  password: string;
}
