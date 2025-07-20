const jwt = require('jsonwebtoken');

const userAuth = async(req , res , next)=>{

    let token = req.cookies.token;
    if(!token) return res.json({success: false , msg: "You are Not Authorized , login again"})

    let decrept = await jwt.verify( token , process.env.JWT_SECRET);
    if(!decrept) return res.json({success: false , msg: "You are Not Authorized , login again"})

    req.user = decrept;
    next();
}

module.exports = userAuth;