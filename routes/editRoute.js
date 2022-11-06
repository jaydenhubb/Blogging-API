const {Router} = require('express')

const blogModel = require('../models/blogModel')

const router = Router()

router.get('/:id', async(req, res)=>{
    const {id} = req.params
    try{
        blog = await blogModel.findById(id)
        res.status(200).render('edit', {blog})
    }
    catch(err){
        res.status(500).send("server Error")
    }

})

module.exports = router