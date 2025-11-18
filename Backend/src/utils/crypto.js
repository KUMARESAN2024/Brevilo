import pkg from "bcryptjs";

const { genSalt, hash, compare } = pkg;

export async function encryptPassWord(password) {
  const salt = await genSalt(10);
  const hased = await hash(password, salt);
  return hased.toString();
}
export async function decryptPassWord(password, temp_passsword) {
  const data = await compare(password, temp_passsword);
  return data;
}
