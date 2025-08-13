import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    try{
        const authHeader = req.headers['authorization']
        if(!authHeader){
            return res.status(401).json({ message: 'Unauthorized' })
        }
        
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({ message: 'Unauthorized' })
            }

            req.user = decoded
            next()
        })
    }catch(error){
        console.log("[!] Error verifying token:", error)
        res.status(401).json({ message: 'Unauthorized' })
    }
}

export default verifyToken