export interface Roles {
  admin: "admin";
  super: "super";
  operator: "operator";
}

export interface UserInformation {
  fullname: string;
  user: string;
  role: Roles[keyof Roles] | "";
}

export interface Credentials {
  user: string;
  password: string;
}

export interface ContextProps {
  user: UserInformation;
  setUser: (user: UserInformation) => void;
  logIn: (credentials: Credentials)=> Promise<void>;
  logOut: () => void;
  isLoading: boolean;
  errorServer: unknown | null;
  isLoadingContext:boolean
}
