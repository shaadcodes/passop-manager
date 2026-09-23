import type { AuthResponse, PasswordEntry, SuccessResponse } from "../types/interfaces";
export declare const passopAPI: {
    register: (email: string, password: string) => Promise<SuccessResponse>;
    login: (email: string, password: string) => Promise<AuthResponse>;
    logout: () => void;
    getPasswords: () => Promise<PasswordEntry[]>;
    addPassword: (websiteName: string, websiteUrl: string, username: string, encryptedPassword: string, notes: string) => Promise<SuccessResponse>;
    updatePassword: (id: string, updateData: Partial<PasswordEntry>) => Promise<SuccessResponse>;
    deletePassword: (id: string) => Promise<SuccessResponse>;
};
