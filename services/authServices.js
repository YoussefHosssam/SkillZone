const jwt = require('jsonwebtoken')
const generateTokens = function (id , role){
    const accessToken = jwt.sign({id , role} , process.env.JWT_ACCESS_KEY , {expiresIn : process.env.JWT_ACCESS_EXPIRE})
    const refreshToken = jwt.sign({id , role} , process.env.JWT_REFRESH_KEY , {expiresIn : process.env.JWT_REFRESH_EXPIRE})
    return {accessToken , refreshToken};
}
const checkToken = (token, type) => {
  try {
    const secret =
      type === 'ACCESS' ? process.env.JWT_ACCESS_KEY : process.env.JWT_REFRESH_KEY;
    const decoded = jwt.verify(token, secret);
    return { valid: true, decoded };
  } catch (err) {
    return { valid: false };
  }
};
module.exports = {generateTokens , checkToken}