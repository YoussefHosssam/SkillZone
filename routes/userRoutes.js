const express = require('express')
const router  = express.Router()
const {getSingleUser , updateUser} = require (`${__dirname}/../controllers/user/userControllers.js`)
const {protect , restrictTo} = require (`${__dirname}/../middlewares/authMiddlewares.js`)

//User Routes
router.route('/me').get(getSingleUser).patch(protect , updateUser)
module.exports = router