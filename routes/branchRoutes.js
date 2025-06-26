const express = require('express')
const router  = express.Router()
const {getSingleBranch , deleteBranch , updateBranch , getNearbyBranches} = require (`${__dirname}/../controllers/branch/branchControllers.js`)
const {protect , restrictTo} = require (`${__dirname}/../middlewares/authMiddlewares.js`)

//Branch Routes
router.get('/nearby',  protect , getNearbyBranches)
router.route('/:id').get(getSingleBranch).patch(protect , restrictTo("centerAdmin" , "admin") , updateBranch).delete(protect , restrictTo("centerAdmin" , "admin") , deleteBranch)
module.exports = router