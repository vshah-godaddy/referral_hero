const jwt=require('jsonwebtoken');
const UserModel = require('../models/user');


module.exports = {
    async verify(req, res, next) {
        try {
          var token = req.headers.token
          if (token) {
            jwt.verify(token, "secret", async function (err, payload) {
                if (payload) {
                    req.userId = payload.userId;
                } else {
                   next()
                }
            });
            return await next();
          } else {
            console.log('Access Token missing');
            return res.unauthorizedUser();
          }
        } catch(e) {
          if(/JsonWebTokenError/i.test(e)) {
            return res.unauthorizedUser();
          }
          return res.error(e);
        }
      }
}