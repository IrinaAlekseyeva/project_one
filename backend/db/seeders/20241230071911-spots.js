'use strict';
'use strict';

const { Spot } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        id: 1,
        ownerId: 2,
        address: "School Street",
        city: "Daly City",
        state: "California",
        country: "United States",
        lat: 37.6879,
        lng: 122.4702,
        name: "Light House",
        description: "It's better to see it than to read about it",
        price: 5000,
        avgRating: 4.45,
        previewImage: "somewhere here"
      },
      {
        id: 2,
        ownerId: 2,
        address: "Merry Street",
        city: "Portland",
        state: "Oregon",
        country: "United States",
        lat: 45.5152,
        lng: 122.6784,
        name: "House Near Rose Garden",
        description: "It's better to see it than to read about it",
        price: 5000,
        avgRating: 5.00,
        previewImage: "somewhere here"
      },
      {
        id: 3,
        ownerId: 5,
        address: "45 Frida Kahlo Steet",
        city: "San Francisco",
        state: "California",
        country: "United States",
        lat: 37.7749,
        lng: 122.4194,
        name: "Salty Beach House",
        description: "It's better to see it than to read about it",
        price: 10000,
        avgRating: 4.99,
        previewImage: "somewhere here"
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ["Light House", "House Near Rose Garden", "Salty Beach House"] }
    }, {});
  }
};
