const { sequelize } = require('./db/models');

try {
  sequelize.authenticate()
    .then(() => {
      console.log('Connection to the database established successfully.');
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });
} catch (err) {
  console.error('Error during authentication:', err);
}
sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.includes(process.env.SCHEMA)) {
    await sequelize.createSchema(process.env.SCHEMA); // schema is a particular part of database that will be used for this project
  }
});