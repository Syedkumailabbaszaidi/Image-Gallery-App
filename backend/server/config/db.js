import ENV from "./env";

module.exports = {
  development: {
    username: ENV.DATABASE_USER || "",
    password: ENV.DATABASE_PASSWORD || "",
    database: ENV.DATABASE_NAME || "",
    host: ENV.DATABASE_HOST || "",
    port: ENV.DATABASE_PORT || "",
    encryptionKey: ENV.ENCRYPTION_KEY || "",
    dialect: "mysql",
    seederStorage: "sequelize",
    logging: false,
  },
  test: {
    username: ENV.DATABASE_USER || "",
    password: ENV.DATABASE_PASSWORD || "",
    database: ENV.DATABASE_NAME || "",
    host: ENV.DATABASE_HOST || "",
    port: ENV.DATABASE_PORT || "",
    encryptionKey: ENV.ENCRYPTION_KEY || "",
    dialect: "mysql",
    seederStorage: "sequelize",
    logging: false,
  },
  production: {
    username: ENV.DATABASE_USER || "",
    password: ENV.DATABASE_PASSWORD || "",
    database: ENV.DATABASE_NAME || "",
    host: ENV.DATABASE_HOST || "",
    port: ENV.DATABASE_PORT || "",
    encryptionKey: ENV.ENCRYPTION_KEY || "",
    dialect: "mysql",
    seederStorage: "sequelize",
    logging: false,
  },
};
