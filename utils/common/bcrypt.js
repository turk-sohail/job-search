const bcrypt = require("bcryptjs");
const configService = require("./configService");


const hashPassword = async(password)=>{
    console.log(typeof configService.SALT_ROUNDS);
    const hash = await bcrypt.hash(password,configService.SALT_ROUNDS);
    return hash;
}

const verifyPassword = async (password,hash)=>{
    const isValid = await bcrypt.compare(password,hash);
    return isValid;
}


module.exports = {
    hashPassword,
    verifyPassword
}