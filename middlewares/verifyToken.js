import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';


const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, JWT_SECRET, (err,payload) => {
            if(err) res.status(403).json("token is not valid !");
            req.user = payload;
            next();
        })
    }else{
        return res.status(401).json("your are not authenticated !");
    }
}

const verifyTokenAndAuthorization = (req,res,next) => {
    verifyToken(req,res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403).json("you are not allowed to access that !");
        }
    })
}

export { verifyToken, verifyTokenAndAuthorization };

