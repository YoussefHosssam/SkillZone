const express = require('express')
const router  = express.Router()
const {getAllCenters , getSingleCenter , CreateCenter , deleteCenter , updateCenter} = require (`${__dirname}/../controllers/center/centerControllers.js`)
const {protect , restrictTo} = require (`${__dirname}/../controllers/auth/authMiddlewares.js`)
router.route('/').get(getAllCenters).post(protect , restrictTo("centerAdmin" , "admin") , CreateCenter)
router.route('/:id').get(getSingleCenter).patch(protect , restrictTo("centerAdmin" , "admin") , updateCenter).delete(protect , restrictTo("centerAdmin" , "admin") , deleteCenter)
module.exports = router