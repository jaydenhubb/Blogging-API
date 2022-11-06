const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

const requireAuth = (req, res, next)=>{

    const token = req.cookies.jwt

    if(token){
         jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken)=>{
            if(err){ 
                console.log(err.message);
                res.status(404).render('log_in')
            }else{
                // console.log(decodedToken)
                req.user = await userModel.findOne({_id:decodedToken.id})
                next();
            }
        })
    }
    else{
        res.status(404).render("log_in")
    }
   }

   const confirmUser= (req, res, next)=>{
    const token = req.cookies.jwt
    if(token){
       jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
         if (err) {
           console.log(err.message);
           res.locals.user = null;
           next()
         } else {
        //    console.log(decodedToken);
           let user = await userModel.findOne({ _id: decodedToken.id });
           res.locals.user = user
           next();
         }
       });
    }else{
        res.locals.user = null;
        next()
    }
   }

module.exports = { requireAuth, confirmUser };