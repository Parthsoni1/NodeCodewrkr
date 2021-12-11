
const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();
const UserController = require('../controllers/user');

router.route('/')
.get(UserController.index)
.post(UserController.newUser)


router.route('/:userId')
.get(UserController.getUser)
.put(UserController.replaceUser)
.patch(UserController.updateUser)
// .delete(UserController.deleteUser)

router.route('/:userId/product')
.get(UserController.getCars)
.post(UserController.newUserCars)

// router.route('/:userId/product/:productId')
// .post(UserController.newUserProductCart)

router.route('/:userId/product/:productId')
.post(UserController.newUserAddToCart)

module.exports = router;