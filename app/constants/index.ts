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

  patterns: {
    FIRST_NAME_PATTERN: /\b[^0-9^\s]{2,28}\b/,
    LAST_NAME_PATTERN: /\b[^0-9^\s]{3,30}\b/,
    LOGIN_PATTERN: /^[a-z][\w\\_?\d*]+$/,
    EMAIL_PATTERN:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    PASSWORD_PATTERN:
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/,
  },
}
