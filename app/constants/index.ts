export const Constants = {
  tokens: {
    ACCESS_TOKEN_PREFIX: 'at',
    ACCESS_TOKEN_LIFE_TIME: 60 * 2,

    REFRESH_TOKEN_PREFIX: 'rt',
    REFRESH_TOKEN_LIFE_TIME: 60 * 8,

    EXPIRED_DATE: 'Thu, 01 Jan 1970 00:00:00 GMT',
  },

  response: {
    USER_NOT_FOUND: `The user doesn't exist`,
    INVALID_CREDENTIALS: 'Invalid login or password',
    USER_ALREADY_EXIST: 'User already exist',
  },

  user: {
    DEFAULT_ROLE: 'patient',
  },
}
