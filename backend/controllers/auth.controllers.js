import db from '../db.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwt.js'

export const login = async (req, res) => {
    const { email, password } = req.body
    try{
        const {rows} = await db.query('SELECT * FROM users WHERE email = $1', [email])
        const user = rows[0]
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
    
        const token = generateToken(user.id, user.email, user.firstName + ' ' + user.lastName)

        res.status(200).json({ message: 'Login successful', token })
    }catch(error){
        console.error('Error logging in:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const register = async (req, res) => {
    try{
        const { firstName, lastName, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const { rows } = await db.query('INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *', [firstName, lastName, email, hashedPassword])
        
        const user = rows[0]

        const token = generateToken(user.id, user.email, user.firstName + ' ' + user.lastName)
        
        res.status(201).json({ message: 'User registered successfully', token })
    }catch(error){
        console.error('Error registering user:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const verifyToken = async (req, res) => {
    res.json({ valid: true , user: req.user })
}