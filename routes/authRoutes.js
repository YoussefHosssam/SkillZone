const router = require('express').Router()
const {authUserRegister , authUserLogin , authUserverifyEmail , authUserForgotPassword , authUserResetPassword , authUserRefreshToken , authUserlogOut} = require(`${__dirname}/../controllers/auth/authControllers.js`)
const {protect} = require (`${__dirname}/../middlewares/authMiddlewares.js`)


router.route('/register').post(authUserRegister)
router.route('/login').post(authUserLogin)
router.route('/verify-email/:token').post(authUserverifyEmail)
router.route('/forgot-password').post(authUserForgotPassword)
router.route('/reset-password/:token').post(authUserResetPassword)
router.route('/refresh-token').post(authUserRefreshToken)
router.route('/logout').post(protect , authUserlogOut)


module.exports = router