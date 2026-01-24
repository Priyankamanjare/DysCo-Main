const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const SECRET = process.env.JWT_SECRET;

function generateToken( userId ) {
    if (!SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    
    if (!userId) {
        throw new Error('User ID is required to generate token');
    }
    
    return jwt.sign(
        {
            userId
        },
        SECRET,
        {expiresIn : "30d"}
    )
}

module.exports = generateToken;