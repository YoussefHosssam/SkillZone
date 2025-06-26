const express = require('express')
const router  = express.Router()
const {getSingleBranch , deleteBranch , updateBranch , getNearbyBranches} = require (`${__dirname}/../controllers/branch/branchControllers.js`)
const {protect , restrictTo} = require (`${__dirname}/../middlewares/authMiddlewares.js`)

//Branch Routes
router.route('/:id').get(getSingleBranch).patch(protect , restrictTo("BranchAdmin" , "admin") , updateBranch).delete(protect , restrictTo("BranchAdmin" , "admin") , deleteBranch)
router.route('/nearby').get(protect , getNearbyBranches)
module.exports = router