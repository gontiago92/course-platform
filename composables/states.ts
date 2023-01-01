export const user = () => useState('user', () => ({
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


