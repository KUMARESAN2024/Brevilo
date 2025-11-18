export interface LoginDetails {
  email: string;
  password: string;
}

export interface SignUpDetails {
  name: string;
  username: string;
  email: string;
  password: string;
  confrim?: string;
  checked?: boolean;
}
export interface MessageDetails {
  message: string;
  error: boolean;
}

export interface userDetails {
  name: string;
  email: string;
  lastlogin: string;
}
