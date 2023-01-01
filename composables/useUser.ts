export type Role = "Administrator" | "User" | "Maintainer"
export interface MetaData {
  email: string;
  password: string;
  name: {
    first: string;
    last: string;
  };
  role: Role;

}

export interface User {
  metaData: MetaData;
  isAuthenticated: boolean;
  reauthenticationRequired: boolean;
}

export const useUser = () => useState('user', (): User => ({
  metaData: {
    email: "john.doe@example.com",
    password: "password",
    name: {
      first: "John",
      last: "Doe"
    },
    role: "Administrator"
  },
  isAuthenticated: false,
  reauthenticationRequired: false
}))


