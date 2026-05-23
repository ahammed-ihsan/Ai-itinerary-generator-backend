const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/userModel");
const mongoose = require('mongoose');

const login = async (email, password) => {
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        return {user, token};
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const register = async (name, email, password) => {
    try{
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name, email, password: hashedPassword});
        await newUser.save();
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        return {user: newUser, token};
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {login, register};