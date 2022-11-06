const {Router} = require('express')
const {requireAuth} = require("../middlewares/requireAuth");
const userModel = require("../models/userModel")
const router = Router()


router.use(requireAuth);

router.get('/create', async(req, res)=>{
    try{
        const user = await userModel.findById(req.user).select('firstName')
        // console.log(user);
        res.render('create', {user})
    }
    catch(error){
        res.status(500).json({error: "server error, please try again"})
    }
})

module.exports = router