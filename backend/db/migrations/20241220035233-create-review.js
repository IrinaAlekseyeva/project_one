'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object. Schema is a subdivision of an existing database
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reviewId: {
        type: Sequelize.INTEGER
      },
      revewText: {
        type: Sequelize.STRING
      },
      stars: {
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "reviews";
    await queryInterface.dropTable('reviews');
  }
};