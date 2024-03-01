const env = require("dotenv").config();

const configService = {
    JWT_SECRET:process.env.JWT_SECRET,
    MONGO_URI:process.env.MONGO_URI,
    PORT:process.env.PORT,
    SALT_ROUNDS:process.env.SALT_ROUNDS
}

module.exports = configService

