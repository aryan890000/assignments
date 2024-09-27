const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("../index")

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token=req.header.authorization;//although bada wala a ana cahiye but ho jata hai woh sb small m change toh small wala hi use krte hai

    const words=token.split(" ");
    const jwtToken=words[1];

    const decodedValue=jwt.verify(jwtToken,JWT_SECRET);
    if(decodedValue.username){// when this specific jwt token is created then the username must be incoded inside it. if decodedValue.username exists i.e
        req.username = decodedValue.username;
        next()
    }else{
        res.status(403).json({
            msg:"you are not authenticated"
        })
    }
}

module.exports = userMiddleware;