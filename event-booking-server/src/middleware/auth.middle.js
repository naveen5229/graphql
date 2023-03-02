const jwt = require('jsonwebtoken');

const authMiddle = (req,res,next) => {
    const authorization = req.get('authorization');
    if(!authorization){
        req.isAuth = false;
        return next();
    }
    const token = authorization.split(' ')[1]        //Bearer Token
    if(!token || token===''){
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'mysecretcode');
    }catch(err){
        req.isAuth = false;
        return next();
    }
    if(!decodedToken){
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
}

module.exports = authMiddle;