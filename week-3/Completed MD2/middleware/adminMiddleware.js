const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");


function adminMiddleware ( req , res, next){
    //Bearer + token
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present
    if(!authHeader){
        res.status(400).json({
            msg: "Authorization header missing",
        });
    }

    // Check if the Authorization header starts with 'Bearer '
    const words = authHeader.split(" ");
    if (words[0] !== "Bearer" || words.length !== 2) {
        return res.status(401).json({
            msg: "Invalid authorization format. Expected 'Bearer <token>'",
        });
    }

    const JWT_Token = words[1];
    try {
        const decodeValue = jwt.verify(JWT_Token,JWT_SECRET);
        if(decodeValue.username){
            // Move to the next middleware or route handler
            req.username = decodeValue.username,
            next();
        }else{
            res.status(403).json({
                msg : "you are not authenticated"
            });
        }
    }catch(err){
        res.status(500).json({
            msg : "invaild or expired token"
        });
    }
}

module.exports = adminMiddleware;