const User = require('../models/User')
const { response } = require('../helpers/GlobalHelper');


module.exports = {
    readUsers : async (req, res) => {
        try{
            const users = await User.find().select("-password");
            return res.status(200).json(response(true, "Data berhasil diambil", users));
        }catch(err){
            return res.status(500).json(response(false, err.message, null));
        }
    },

    readUser : async (req, res) => {
        try{
            const id = req.params.id;
            const user = await User.findById(id).select("-password");
            if(user === null) return res.status(400).json(response(false, "Data tidak ditemukan", null));
            return res.status(200).json(response(true, "Data berhasil diambil", user));
        }catch(err){
            return res.status(500).json(response(false, err.message, null));
        }
    },

    createUser : async (req, res) => {
        try{
            let body = { ...req.body };
            body.created_at = Date.now();
            const user = new User(body);
            const createdUser = await user.save();
            if(!createdUser) return res.status(400).json(response(false, "Data gagal dibuat", null));
            return res.status(201).json(response(true, "Data berhasil dibuat", createdUser));
        }catch(err){
            return res.status(500).json(response(false, err.message, null));
        }
    },

    updateUser : async (req, res) => {
        try{
            const id = req.params.id;
            let body = { ...req.body };
            body.created_at = undefined;
            const updatedUser = await User.findOneAndUpdate({_id : id}, body, {new : true});
            if(!updatedUser) return res.status(400).json(response(false, "Data gagal diedit", null)); 
            return res.status(200).json(response(true, "Data berhasil diedit", updatedUser));
        }catch(err){
            return res.status(500).json(response(false, err.message, null));
        }
    },

    deleteUser : async (req, res) => {
        try{
            const id = req.params.id;
            const deletedUser = await User.findByIdAndDelete(id);
            if(!deletedUser) return res.status(400).json(response(false, "Data gagal dihapus", null)); 
            return res.status(200).json(response(true, "Data berhasil dihapus", deletedUser));
        }catch(err){
            return res.status(500).json(response(false, err.message, null));
        }
    }

}