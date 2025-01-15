// This will allow you to load the database configuration environment variables
// from the `.env` file into the `config/index.js`, as well as define the global schema for the project.

// backend/config/database.js
const config = require('./index'); // Assuming this loads your environment config

module.exports = {
  development: {
    storage: config.dbFile,  // Path to SQLite database
    dialect: "sqlite",       // Use SQLite for local development
    seederStorage: "sequelize", // Store seed data in Sequelize
    logQueryParameters: true,  // Log query parameters for debugging
    typeValidation: true,      // Enable type validation in Sequelize
  },

  production: {
    use_env_variable: 'DATABASE_URL', // Use DATABASE_URL for connection string in production
    dialect: 'postgres',              // Use PostgreSQL in production
    seederStorage: 'sequelize',       // Store seed data in Sequelize
    dialectOptions: {
      ssl: {
        require: true,               // Ensure SSL is required in production
        rejectUnauthorized: false,   // Disable certificate verification (e.g., for Heroku)
      },
    },
    define: {
      schema: process.env.SCHEMA,    // Use the SCHEMA environment variable to specify the schema
    },
  },
};
