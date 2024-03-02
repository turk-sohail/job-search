const {jwtService} = require("../utils");
const User = require("../models/User");
const {UnauthenticatedError} = require("../errors");

const AuthMiddleWare = async(req,res,next)=>{
    const authHeaders = req.headers.authorization;
    if(!authHeaders || !authHeaders.startsWith("Bearer ")){
        throw new UnauthenticatedError("Not Authorized to access route");
    }
    
    const token = req.headers.authorization.split(" ")[1];
    try {
       const decoded = await jwtService.verifyToken(token);
        const user = await User.findOne({_id:decoded.id});
        req.user = user;
        next();
    } catch (error) {
        throw new UnauthenticatedError("Not Authorized to access route");
    }
    
    
}


module.exports = AuthMiddleWare;