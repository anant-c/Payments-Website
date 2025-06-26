import jwt from 'jsonwebtoken';

export const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;

    //bearer is used for tokens for authenticating users, for apis it will be apikey and so on..
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            message: "User not valid."
        })
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(403).json({
                message: "Invalid token payload."
            });
        }
        
    }
    catch (err) {
        const msg = err.name === 'TokenExpiredError'
            ? 'Session expired. Please sign in again.'
            : 'Invalid authentication token.';
        return res.status(401).json({ message: msg });
    }
      
    
};