const jwt = require("jsonwebtoken");
const zod = require("zod");
const jwtPassword = "@hdmoer#6%*9^&3mdnfJKEp)9211!34msdr+-ssdfiGGHr%64";

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJwt(username, password) {

   const emailResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);

    if(!emailResponse.success || !passwordResponse.success){

        return null;
    }

    const tokenSignuture = jwt.sign({username}, jwtPassword);

    return tokenSignuture;
}



function verifyJwt(token) {

    try
    {
        jwt.verify(tokenSignuture, jwtPassword);
        return true;

    } catch(erro){

    }
    return false;
}

function decodeJwt(token) {

    const decodeTokenSignuture =  jwt.decode(tokenSignuture);

    if(decodeTokenSignuture){
        return true
    }else{
        return false
    }
 
}

module.exports = {
    signJwt,
    verifyJwt,
    decodeJwt,
    jwtPassword
}