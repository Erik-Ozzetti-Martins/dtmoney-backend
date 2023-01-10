export default {
  jwt: {
    secret: process.env.SECRET || 'e9f9928c7343a5a20d7d98ad08c40f89',
    expiresIn: process.env.EXPIRES_IN || '4h',
    secret_refreshToken:
      process.env.SECRET_REFRESH_TOKEN ||
      'cc023a09dceead7196600186b6b980a6e294d613',
    expires_in_refresh_token: process.env.EXPIRES_IN_REFRESH_TOKEN || '15d',
  },
};
