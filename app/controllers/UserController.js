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



}