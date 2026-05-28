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
  accounts: {
    notFound: "accounts.notFound",
    invalidId: "accounts.invalidId",
    nameRequired: "accounts.nameRequired",
    typeRequired: "accounts.typeRequired",
    typeInvalid: "accounts.typeInvalid",
    currencyRequired: "accounts.currencyRequired",
    currencyInvalid: "accounts.currencyInvalid",
    initialDepositInvalid: "accounts.initialDepositInvalid",
    cannotDeleteNonZero: "accounts.cannotDeleteNonZero",
    forbidden: "accounts.forbidden",
    invalidOwnerId: "accounts.invalidOwnerId",
  },
  validation: {
    invalidData: "validation.invalidData",
  },
  payment: {
    //TODO
  },
  server: {
    internalServerError: "server.internalServerError",
  },
} as const;
