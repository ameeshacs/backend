//authorization module for the instructor 
const jwt=require('jsonwebtoken');
const config=require('config');

//function to check whether jwt token of the instructor is valid
function authz(req,res,next){

    const token=req.header('x-auth-token');

    //if no token is provided
    if(!token){
        return res.status(401).send('Access denied. No token provide.');
    }

    try{
        //if the token provided is valid only the access for the relevant route will be granted
        const decoded=jwt.verify(token,config.get('jwtPrivateKey'));
        req.instructor=decoded;
        next();
    }
    catch(ex){
        //if jwt is invalid authorization will not be granted to the instructor
        res.status(400).send('Invalid Token');
    }
}


module.exports=authz;