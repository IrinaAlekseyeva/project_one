//This file will hold the resources for the route
// paths beginning with `/api/users`

const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User } = require('../../db/models');
const spot = require('../../db/models/spot');
const router = express.Router();

// to get all spots
router.get('/', async (req, res) => {
  const allSpots = await Spot.findAll();
  res.json(allSpots);
})

// get all spots owned by a single user
router.get('/current', async (req, res) => {
  // An authenticated user is required for a successful response
  const {user} = req;
  const userSpots = await Spot.findAll({
    where: {
      ownerId: user.id,
    },
  })
  res.json(userSpots);
});

//to delete a spot belonging to a specific user
router.delete(
  "/:spotId", async (req, res) => {
    const {user} = req;
    const {spotId} = req.params;
    const spotToDelete = await Spot.findOne({
      where: {
        id: spotId,
        ownerId: user.id,
      }
    });
  await spotToDelete.destroy();
  }
);

// to create a spot by a particular user
router.post(
    '/',
    async (req, res, next) => {

      const { user } = req;
      const { address, city, state, country, lat, lng, name, description, price, avgRating, previewImage } = req.body;
      const newSpot = await Spot.create({ 
        ownerId: user.id, 
        address, 
        city, 
        state, 
        country, 
        lat, 
        lng, 
        name, 
        description, 
        price, 
        avgRating, 
        previewImage
      });
      
  
      return res.json({
        spot: newSpot
      });
    }
  );
  
  // to delete spot by its id
  // router.delete(
  //   "/:spotId", async (req, res) => {
  //     const {spotId} = req.params;
  //     const spotToDelete = await Spot.findByPk(spotId);
  //     await spotToDelete.destroy();
  //     return res.json({message: `Spot ${spotId} is deleted`});
  //   }
  // );



  router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

module.exports = router;