import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateJWTToken } from "../services/token.js";

const router = Router()


router.get('/login',(req,res)=>{
    // res.sendFile(path.join(__dirname, 'views', 'about.html'))
    res.send('login page')
})

router.get('/register',(req,res)=>{
    res.send('register page')
})

router.post('/login',async(req,res)=>{
    const {email, password} = req.body

    if(!email || !password){
        req.flash('login Error', "All fields is required")
        // req.flash()
        res.status(404).send('All fields is required')
        return
    }


    const existUser = await User.findOne({email})
    console.log(existUser);
    if(!existUser) {
        console.log("User not found");
        req.flash('login Error', "User not found")
        res.status(404).send("User not found")
        return 
    }
    
    const isPassEqual = await bcrypt.compare(password, existUser.password)
    res.status(200)
    if(!isPassEqual) {
        console.log("Password wrong");
        req.flash('login Error', "password wrong")
        res.status(401).send("Unauthorized")
        return 
    }

    const token  = generateJWTToken(existUser._id)
    res.cookie("token", token, {httpOnly:true, secure:true})
    res.redirect('/')
})

router.post('/register',async(req,res)=>{
    const {firstName, lastName, email, password} = req.body
    if(!firstName || !lastName || !email || !password){
        req.flash('register Error', "All fields is required")
        // req.flash()
        res.status(404).send('All fields is required')
        return
    }

    const candidate = await User.findOne({email })

    if(candidate){
        req.flash('register Error', "User already exist")
        console.log('user already exist');
        // req.flash()
        res.status(404).send('User already exist')
        return
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
    }
    const user = await User.create(userData)
    const token  = generateJWTToken(user._id)
    res.cookie("token", token, {httpOnly:true, secure:true})
    console.log(token);
    res.redirect('/')
})



export default router