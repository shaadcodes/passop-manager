export declare const deriveKey: (password: string, salt: string) => Promise<CryptoKey>;
export declare const encryptData: (plaintext: string, key: CryptoKey) => Promise<string>;
export declare const decryptData: (encryptedString: string, key: CryptoKey) => Promise<string>;
