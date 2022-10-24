
const isAuthenticated = (req,res,next)=>{

    if(req.isAuthenticated()){
        next()
        return;
    }
 
    res.status(401).json({msg:"You are not authorized to visit this page."})
    
}

module.exports = isAuthenticated