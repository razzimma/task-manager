const router = require('express').Router();
const {User} = require("../models/index")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//to generate token
const generateToken =(userDetails) => {
    const token = jwt.sign({userDetails}, process.env.SECRET);
    return token
}

//Routes to find all user
router.get("/getusers", async (req, res)=>{
    try {
        const data = await User.findAll();
        res.status(200).send(data);
    } catch (error) {
      res.status(405).send(error.message)  
    }
});

//Route to get and add a new user
router.post("/register", async(req, res)=>{
    const{username, password} = req.body
    try {
        if(!username){
            throw new Error("Username is required");
        }
        if(!password){
            throw new Error("Password is required");
        }
        if (!validator.isLength(password, {min:6})) {
            throw new Error("Password should be a minimum of 6 characters");
        }

        const userExists = await User.findOne({where: {username:username}});

        if (userExists) {
            throw new Error("Username already exists");
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        await User.create({username: username, password: hashedPassword});
        res.status(200).send("User has been created successfully")
    } catch (error) {
        res.status(403).send({error: error.message})
    }
})
router.post("/login", async(req, res)=>{
    const{username, password} = req.body
    try {
        if(!username){
            throw new Error("Username is required");
        }
        if(!password){
            throw new Error("Password is required");
        }
        
    

        const userExists = await User.findOne({where: {username:username}});

        if (!userExists) {
            throw new Error("Username does not exists");
        }
        
        const correctPassword = await bcrypt.compare(password, userExists.password)
        if (!correctPassword) {
            throw new Error("Password does not match")
        }

        const token = generateToken(userExists);

        res.status(200).send({
            message: "User logged in successfully",
            user: userExists,
            token:token,
        })
    } catch (error) {
        res.status(403).send({error: error.message})
    }
})

module.exports = router;