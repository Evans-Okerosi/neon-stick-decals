const jwt = require('jsonwebtoken')
const User = require("../models/user/user")
const settings = require("../config/settings")

module.exports = (req, res, next) =>{
    if(!req.headers.autorization){
        return res.status(401).end()
    }
     // get the last part from a authorization header string like "bearer token-value"
     const token = req.headers.authorization.split(' ')[1];

     //decode the token using a secret phrase
     return jwt.verify(token, settings.secret, (err, decoded)=>{
         // for unauthorised status
         if(err) { return res.status(401).end() }

         const userId = decoded.sub
          console.log(userId)
         //if user exists
         return User.findEmail(userId,(userErr, user)=>{
             if(userErr || !user){
                 res.status(401).end
             }
             // pass the user details to next route
             req.user = user
             return next()
         })
     })
}