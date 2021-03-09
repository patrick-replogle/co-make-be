require("dotenv").config();
const dbConnection = process.env.DATABASE_URL;

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      database: "coMake",
    },
    migrations: {
      directory: "./database/migrations",
      tablename: "knex_migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
    pool: {
      min: 2,
      max: 10,
    },
    useNullAsDefault: true,
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./database/test.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
  production: {
    client: "pg",
    connection: dbConnection,
    useNullAsDefault: true,
    ssl: {    
      require: true,
      rejectUnauthorized: false 
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
};
