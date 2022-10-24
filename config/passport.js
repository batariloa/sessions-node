const passport = require('passport')
const LocalStrategy = require('passport-local')
const mongoose = require('mongoose')

const User = require('../model/User')


// callback method for passport local strategy
const verifiyCallback = (username, password, done) => {

    User.findOne({email: username}).then(async (user) => {
        if (!user) {
            return done(null, false)
        }

        const isValid = await user.comparePassword(password)
        console.log(`User login for email "${username}" is valid:  ${isValid}`)

        if (isValid) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    }).catch((err) => {
        console.log(err)
        done(err)
    })

}

// Let passport know our field names
const customFields = {
    usernameField: 'email',
    passwordField: 'password'
}

// create and use strategy
const strategy = new LocalStrategy(customFields, verifiyCallback);

passport.use(strategy)


// tell passport how to create and retrieve session data
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((userId, done) => {
    User.findById(userId).then((user) => {
        done(null, user)
    }).catch(err => done(err))
})
