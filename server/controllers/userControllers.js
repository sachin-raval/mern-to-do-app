const USER = require("../model/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Register = async (req , res)=> {
    try {
        let { name , email , password } = req.body;


        let user = await USER.findOne({email});
        if(user){
            return res.json({ success: false , msg: "Email Already Exist" })
        };


        let decreptPass = await bcrypt.hash(password , 10);

        let newUser = await new USER({ name, email, password: decreptPass });
        await newUser.save();

        res.json({ success: true , msg: "Register Successfully"});
    } catch (error) {
        res.json({ success: false , error: error.message , msg: "server Error" });
    }
}


const Login = async (req , res)=> {
    try {
        
        let { email , password } = req.body;

        let user = await USER.findOne({email});
        if(!user) return res.json({ success: false , msg: "Email not Exist"});

        let decreptPass = await bcrypt.compare(password , user.password);
        if(!decreptPass) return res.json({ success: false , msg: "Invalid Password"});

        let token = await jwt.sign({id: user._id} , process.env.JWT_SECRET);

        res.cookie('token' , token , {
            httpOnly: true,
            secure: process.env.CURRENT_ENV === 'production',
            sameSite: process.env.CURRENT_ENV === 'production' ? 'none': 'Strict',
            maxAge: 3*24*60*60*1000
        });

        res.json({ success: true , msg: "Login Successfully"});

    } catch (error) {
        res.json({ success: false , error: error.message , msg: "server Error" });
    }
}

const CheckLogin = async (req, res)=>{
    try {
        res.json({ success: true , msg: "You are Authorized"});
    } catch (error) {
        res.json({ success: false , error: error.message , msg: "server Error" });
    }
}


module.exports = { CheckLogin , Register , Login }