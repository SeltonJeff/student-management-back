import * as crypto from "crypto";
import Env from "../env";

export const encrypt = (data: string): string => {
  const iv = Buffer.from([
    23, 54, 117, 101, 2, 88, 45, 102, 56, 57, 20, 90, 98, 119, 73, 38,
  ]);
  const cipher = crypto.createCipheriv("aes-256-cbc", Env.APP_CRYPT_KEY, iv);
  const encrypted = cipher.update(data);
  return Buffer.concat([encrypted, cipher.final()]).toString("base64");
};

export const decrypt = (data: string): string => {
  const iv = Buffer.from([
    23, 54, 117, 101, 2, 88, 45, 102, 56, 57, 20, 90, 98, 119, 73, 38,
  ]);
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Env.APP_CRYPT_KEY,
    iv
  );
  const decrypted = decipher.update(data, "base64", "utf8");
  return decrypted + decipher.final();
};
