
const {verify} = require('jsonwebtoken'); //jwt ini digunakan agar bisa mengakses lebih dr 1 aplikasi dgn server berbeda
                                        // hak akses

 
module.exports={
    checkToken:(req,res,next)=>{
        let token = req.get("authorization");
 
        if(token){
            let wow = token.slice(7)
            verify(wow,"secretkey",(err,decoded)=>{
                if(err){
                    res.json({
                        success:0,
                        message:"Login First"
                    })
                }else{
                    let user = decoded.result
                    next()        
                }
            })
        }else{
            res.json({
                success:0,
                message:"Access Denied : unauthorized user"
            })
        }
    }
}

