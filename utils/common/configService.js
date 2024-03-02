const env = require("dotenv").config();
/************ */
//convert strings of env values to numbers


const configService = {
    JWT_SECRET:process.env.JWT_SECRET,
    MONGO_URI:process.env.MONGO_URI,
    PORT:process.env.PORT,
    SALT_ROUNDS:parseInt(process.env.SALT_ROUNDS)
}

module.exports = configService

