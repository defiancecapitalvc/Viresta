module.exports = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "viresta-local-dev-secret",
  jwtExpiresIn: process.env.JWT_EXPIRE || "7d",
  cookieDays: Number(process.env.COOKIE_EXPIRE) || 7,
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
};
