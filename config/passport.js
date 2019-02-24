const JwtStrategy =require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User =require('../models/user');
const config =require('../config/db');


module.exports=function(passport){
console.log("hey1")

let opts={};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey=config.secret;

passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    console.log("inside")
    console.log(jwt_payload)
User.getUserById( jwt_payload._id,(err,user)=>{
if(err){  
    console.log("error in authenticating ")
    return done(err,false)}
if(user){  

    console.log('done user __________===========')
    return done(null,user)
}
else{
    console.log('done __________===========')
return done(null,false);
}


})

}))




}

