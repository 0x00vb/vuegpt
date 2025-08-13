import jwt from 'jsonwebtoken'

export const generateToken = (userId, email, name) => {
    return jwt.sign(
        { userId, email, name }, 
        process.env.JWT_SECRET, 
        { expiresIn: '8h' }
    )
}
