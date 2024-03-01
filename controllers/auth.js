const {StatusCodes} = require("http-status-codes");
const User = require("../models/User");
const {BadRequestError,NotFoundError,UnauthenticatedError} = require("../errors");
const {jwtService,configService,bcryptService} = require("../utils");


const register =  async(req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        throw new BadRequestError("please provide correct values");
    }
    const hash = await bcryptService.hashPassword(password);
    const user =  new User({...req.body,password:hash});
    const token = await jwtService.generateToken({id:user._id});
    await user.save();

    res.status(StatusCodes.CREATED).json({user:{name:user.name},token})
}

const login = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        throw new BadRequestError("Please provide email and password correctly");
    }

    const user = await User.findOne({email});
    if(!user){
        throw new UnauthenticatedError("Invalid credentials");
    }
    const isValidPassword = await bcryptService.verifyPassword(password,user.password);
    if(!isValidPassword){
        throw new UnauthenticatedError("Invalid credentials");
    }

    const token = await jwtService.generateToken({id:user._id});
    res.status(StatusCodes.OK).json({user:user.name,token});





}


module.exports = {register,login}