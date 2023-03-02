const express = require('express');
require('dotenv').config();
const app = express();

const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./schema/index');
const graphqlResolver = require('./resolver/index');

const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

const cookieSession = require('cookie-session');

// passport.use(new Strategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: 'http://localhost:5000/auth/google/verify'
// },
//     (accessToken, refreshToken, profile, done) => {
//         console.log(profile)
//         done(null, profile);
//     }));

//     passport.serializeUser((user, done) => {
//         done(null, user.id);
//     });

//     passport.deserializeUser((id, done) => {
//         done(null, id);
//     });

const CORS = require('cors');

app.use(CORS({
    origin: `http://localhost:3000`
}));

// app.use(cookieSession({
//     name:'session',
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [process.env.SESSION_KEY]
// }))

app.use(require('./middleware/auth.middle'));
// app.use(passport.initialize());
// app.use(passport.session())


app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
}));

// app.get('/', passport.authenticate('google', {
//     scope: ['email']
// }), (req, res) => {
    
// });


// app.get('/auth/google/verify', passport.authenticate('google', {
//     failureRedirect: '/failure',
//     successRedirect:'/graphql',
//     session:true
// }), (req, res) => {                                 //req.user
//     console.log(req.cookies)
// });

app.get('/test', (req, res) => {
    res.status(201).send('test');
})



module.exports = app;