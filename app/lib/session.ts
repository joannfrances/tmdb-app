import { randomBytes, createCipheriv } from "crypto";

interface SessionData {
  [key: string]: any;
}

interface EncryptedData {
  iv: string;
  content: string;
}

export function encrypt(data: SessionData): EncryptedData {
  try {
    const algorithm = "aes-256-ctr";
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      throw new Error("SECRET_KEY is not defined.");
    }

    if (secretKey.length !== 64) {
      throw new Error("SECRET_KEY must be 64 characters long for AES-256-CTR.");
    }

    const iv = randomBytes(16);
    const cipher = createCipheriv(algorithm, Buffer.from(secretKey, "hex"), iv);

    const encrypted = Buffer.concat([
      cipher.update(JSON.stringify(data)),
      cipher.final(),
    ]);

    return {
      iv: iv.toString("hex"),
      content: encrypted.toString("hex"),
    };
  } catch (error) {
    console.error("Error in encryption:", error);
    throw new Error("Encryption failed");
  }
}
