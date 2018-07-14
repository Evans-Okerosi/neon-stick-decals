const express = require('express');
const validator = require('validator');
const passport = require('passport');

router = express.Router()
 function validateSignupForm(form){
     return true
 }

router.post("/signup", (req,res, next)=> {
    const validationResult = validateSignupForm(req.body)
    if(!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        })
    }
    return passport.authenticate('local-signup', err =>{
        if(err){
            if(err.name==="MysqlError" && err.code === 11000) {
                //TODO: check mysql errors
                 return res.status(409).json({
                     success: false,
                     message: "check form for errors",
                     errors: {
                         email: " this email is already taken"
                     }
                 })
            }
            return res.status(400).json({
                success: false,
                message:" could not process the form"
            })
        }
        return res.status(200).json({
            success:true,
            message: "sign up successful"
        })

    })
})