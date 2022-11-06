const UserModel = require('../models/userModel')
const handleErrors = require('../errorHandlers/authErrors')
const jwt = require('jsonwebtoken')
const maxAge = 60*60*1000
const create_token = (id)=>{
  return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn:maxAge});
}

module.exports.signup_get = (req, res)=>{
    res.render('sign_up')
}
module.exports.signup_post = async (req, res)=>{
    const {firstName, lastName, email, password} = req.body
    try{
        const user = await UserModel.signup(firstName, lastName, email, password)
        const token = create_token(user._id)       
        res.cookie("jwt", token, {httpOnly:true, maxAge})
        res.status(200).json({user:user._id})
    }
    catch(err){
        const errors = handleErrors(err)
        res.status(400).json({ errors });
    }
}
module.exports.login_get = (req, res)=>{
    res.render('log_in')
}
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = create_token(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err)
    res.status(500).json({ errors });
  }
};

module.exports.logout_get = (req, res)=>{
  res.cookie('jwt', " ", {maxAge:1})
  res.redirect('/')
}



