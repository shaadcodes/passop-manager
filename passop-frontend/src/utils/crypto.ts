const bufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  const binary = Array.from(bytes)
    .map((byte) => String.fromCharCode(byte))
    .join("");

  return window.btoa(binary);
};

const base64ToBuffer = (base64: string): Uint8Array<ArrayBuffer> => {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
};

export const deriveKey = async (
  password: string,
  salt: string,
): Promise<CryptoKey> => {
  const enc = new TextEncoder();

  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"],
  );

  return await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode(salt),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
};

export const encryptData = async (
  plaintext: string,
  key: CryptoKey,
): Promise<string> => {
  const enc = new TextEncoder();
  const iv: Uint8Array<ArrayBuffer> = new Uint8Array(new ArrayBuffer(12));
  window.crypto.getRandomValues(iv);
  const ciphertextbuffer = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv.buffer,
    },
    key,
    enc.encode(plaintext),
  );

  const base64Iv = bufferToBase64(iv.buffer);
  const base64Ciphertext = bufferToBase64(ciphertextbuffer);

  return `${base64Iv}: ${base64Ciphertext}`;
};

export const decryptData = async (
  encryptedString: string,
  key: CryptoKey,
): Promise<string> => {
  const [base64Iv, base64Ciphertext] = encryptedString.split(":");

  if (!base64Iv || !base64Ciphertext) {
    throw new Error("Invalid encrypted data format!");
  }

  const iv = base64ToBuffer(base64Iv);
  const ciphertext = base64ToBuffer(base64Ciphertext);
  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    ciphertext,
  );

  const dec = new TextDecoder();

  return dec.decode(decryptedBuffer);
};
