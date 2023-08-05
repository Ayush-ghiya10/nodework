const jwt = require('jsonwebtoken');

module.exports = async(req,res,next)=>{
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const err = new Error('Not Authenticated');
        err.statusCode = 401;
        throw err;
    }try {
        const token = authHeader.split(' ')[1];
        let decodedToken =  jwt.verify(token,'supersecret');
        req.payload = decodedToken.data;
        
    } catch (error) { 
        error.statusCode = 500;
        throw error;
    }
    next();

}