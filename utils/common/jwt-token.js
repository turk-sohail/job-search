const jwt = require("jsonwebtoken");
const configService = require("./configService");

const generateToken =  async(payload)=>{
    const token = await jwt.sign(payload,configService.JWT_SECRET,{expiresIn:"3d"});
    return token
}


const verifyToken = async()=>{
    const decoded = await jwt.verify(token,configService.JWT_SECRET);
    return decoded
}

module.exports = {
    generateToken,
    verifyToken
}