module.exports = async(req,res,next)=>{
    try {
        const{payload:{userType}}=req;
        if(!userType == 'admin') throw Error('Not Authorised');
        next();
    } catch (error) {
        res.status(402).send({status:"Failed",message:error.message});
    }
}                  