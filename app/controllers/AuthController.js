const User = require('../models/User')
const { response } = require('../helpers/GlobalHelper');
const Bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

module.exports = {
    login : async (req, res) => {
        try{
            let data = {
                username : req.body.username,
                password : req.body.password
            }
    
            const user = await User.findOne({
                $and : [
                    { $or : [{ username : data.username }, { email : data.username}]}
                ]
            });
            if(!user) return res.status(400).json(response(false, "Invalid, email not Found", null));
            if(!Bcrypt.compareSync(data.password, user.password)) return res.status(400).json(response(false, "Invalid, Data not Found", null));

            const token = JWT.sign({
                id : user._id
            }, process.env.JWT_SECRET,{
                expiresIn : "90d" //90 days
            })

            return res.status(200).json(response(true, "Login Success", token));
        }catch(err){
            return res.status(200).json(response(false, err.message, null));
        }
    },

    register : async (req, res) => {
        try{
            if(req.body.password !== req.body.repassword) return res.status(400).json(response(false, "Password & Repassword not match", null));
            let currentDate = Date.now();
            let data = {
                username : req.body.username,
                password : Bcrypt.hashSync(req.body.password),
                name : req.body.name,
                email : req.body.email,
                birthDate : req.body.birthDate,
                location : req.body.location,
                phoneNumber : req.body.phoneNumber,
                createdAt : currentDate,
                updatedAt : currentDate
            }
            const user = new User(data);
            let createdUser = await user.save();
            if(!createdUser) return res.status(400).json(response(false, "Data gagal dibuat", null));
            const getUser = await User.findById(createdUser._id).select("-password");
            return res.status(201).json(response(true, "Data berhasil dibuat", getUser));
        }catch(err){
            return res.status(500).json(response(false, err.message, null));
        }
    },

}