export const ErrorKeys = {
  auth: {
    usernameRequired: "auth.usernameRequired",
    passwordRequired: "auth.passwordRequired",
    invalidCredentials: "auth.invalidCredentials",
    usernameAlreadyTaken: "auth.usernameAlreadyTaken",
    tokenMissing: "auth.tokenMissing",
    tokenInvalid: "auth.tokenInvalid",
  },
  users: {
    userNotFound: "users.userNotFound",
    invalidUserId: "users.invalidUserId",
    usernameRequired: "users.usernameRequired",
    passwordRequired: "users.passwordRequired",
    updateFieldsRequired: "users.updateFieldsRequired",
  },
  validation: {
    //TODO
  },
  payment: {
    //TODO
  },
  server: {
    internalServerError: "server.internalServerError",
  },
} as const;
