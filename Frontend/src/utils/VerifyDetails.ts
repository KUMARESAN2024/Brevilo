import type { MessageDetails } from "./Types";

export function CheckEmail(email: string): MessageDetails {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return { error: true, message: "Email cannot be empty." };
  }

  if (!emailRegex.test(email)) {
    return { error: true, message: "Invalid email format." };
  }

  return { error: false, message: "" };
}

export function CheckName(value: string): MessageDetails {
  if (!value) {
    return { error: true, message: "Name cannot be empty." };
  }

  const checkName = /^[A-Za-z\s]+$/;
  if (!checkName.test(value)) {
    return {
      error: true,
      message: "Name can only contain letters and spaces.",
    };
  }

  return { error: false, message: "" };
}

export function CheckUserName(name: string): MessageDetails {
  if (name.length < 5) {
    return {
      error: true,
      message: "Username must be at least 5 characters long.",
    };
  }

  const usernameRegex = /^[A-Za-z0-9_]+$/;
  if (!usernameRegex.test(name)) {
    return {
      error: true,
      message: "Username can only contain letters, numbers, and underscores.",
    };
  }

  return { error: false, message: "" };
}

export function CheckPassword(password: string): MessageDetails {
  // Password  at least 8 characters, at least one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (!password) {
    return { error: true, message: "Password cannot be empty." };
  }

  if (!passwordRegex.test(password)) {
    return {
      error: true,
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase letters, and a number.",
    };
  }

  return { error: false, message: "" };
}
