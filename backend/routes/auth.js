const express = require('express');
const router = express.Router();
const User = require('../models/User');

//using npm pakage jsonwebtoken
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Shivani@Gour$';

//using npm pakage bcryptjs to genrate hash and salt for passwords
var bcrypt = require('bcryptjs');

//using a middleware function
var fetchuser = require('../middleware/fetchuser');

//using an express validator pakage to validate credentials
const { body, validationResult } = require('express-validator');


//Route 1 : creating a User using : POST "/api/auth/createUser" .  does not require login
  router.post('/createUser' ,[body('name','Enter a valid Name').isLength({min : 3}),
  body('email','Enter a valid Email').isEmail(),
  body('password','Enter a valid altleast 5 character Password').isLength({min : 5})  
 ], async(req , res)=>{
    let success = false
    //if there are errors returns bad requests and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return  res.status(404).json({success, errors: result.array() });
    }

    try{
    //check whether user with this email exits
    let user1 = await User.findOne({email:req.body.email});
    if(user1){
        return  res.status(404).json({success, errors: "Sorry a user with email already exits"});
    }
    //creating  a salt  and hash for password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hashSync(req.body.password,salt);

    //create a new user
    let user = await User.create({
        name : req.body.name,
        email : req.body.email,
        password: secPass ,
    })
    //sending a token
    const data ={
        user:{
            id:user.id
        }
    }
    const authToken = jwt.sign(data ,JWT_SECRET );
    let success = true
    res.json({success,authToken});  
}
//catch errors
catch(error)
{
    console.log(error.message);
    res.status(500).send("Internal server error");
}
})

//Route 2 :Authenticating a User using : POST "/api/auth/login" .  does not require login
router.post('/login',[
  body('email','Enter a valid Email').isEmail(),
  body('password','password cannot be blank').exists()
 ], async(req , res)=>{
    let success = false
    //if there are errors returns bad requests and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return  res.status(404).json({ errors: result.array() });
    }

    const{email ,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            success = false
            return res.status(404).json({error : "Please login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password , user.password);
        if(!passwordCompare) {
            success = false
                return res.status(404).json({success , error : "Please login with correct credentials"});  
        }
       
        const data ={
            user:{
                id:user.id
            }
        }
         //sending a token
        const authToken = jwt.sign(data ,JWT_SECRET );
        let success = true
        res.json({success,authToken}); 

    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send("Internal server error1");
    }
 })

 //Route 3 : Getloggedin user deatils  : POST "/api/auth/getuser" .  require login
 router.post('/getuser',fetchuser ,async(req , res)=>{
    try{
        const userId = req.user.id;
        const user = await User.findOne({ _id: userId}).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.send(user);
    }
    catch(error)
    {
     console.log(error.message);
     res.status(900).send("Internal server error");
    }
})

module.exports = router;
