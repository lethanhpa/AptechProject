const JWT = require('jsonwebtoken');

const jwtSettings = require('../constants/jwtSettings');

const encodeToken = (userId, email, firstName, lastName) => {
  return JWT.sign({
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1),
    audience: jwtSettings.AUDIENCE,
    issuer: jwtSettings.ISSUER,
    _id: userId,
    email: email,
    // fullName: firstName + '-' + lastName,
    fullName: `${firstName} - ${lastName}`,
    algorithm: 'HS512',
  }, jwtSettings.SECRET)
}

module.exports = encodeToken;