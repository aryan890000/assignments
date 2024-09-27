const jwt=require("jsonwebtoken");
const {JWT_SECRET}=requier("../config");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token=req.header.authorization;//although bada wala a ana cahiye but ho jata hai woh sb small m change toh small wala hi use krte hai

    const words=token.split(" ");
    const jwtToken=words[1];
    //using try catch for better error handling 
    try {
        const decodedValue=jwt.verify(jwtToken,JWT_SECRET);
    if(decodedValue.username){// when this specific jwt token is created then the username must be incoded inside it. if decodedValue.username exists i.e
        next()
    }else{
        res.status(403).json({
            msg:"you are not authenticated"
        })
    }
    } catch(e){
        res.json({
            msg:"incorrect inputs"
        })
    }
    
    //now whenever we are using token we need a secret to sign the token and same would be used to verify the token
    //so go to top level file index.js and define there const JWT_SECRET="god"

}

module.exports = adminMiddleware;