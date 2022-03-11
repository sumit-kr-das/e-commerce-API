import { PASS_SEC } from "../../config";
import User from "../../models/User";

const userController = {
    /* update user info */
    async updateUser(req,res) {
        if(req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, PASS_SEC).toString();
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },{ new: true }); /* new: true returns the new updated user */
            res.status(200).json(updatedUser);
        }catch(err){
            res.status(500).json(err);
        }
    },

    /* delete user info */
    async deleteUser(req,res) {
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("user hasbeen deleted !");
        }catch(err){
            res.status(500).json(err);
        }
    },

    /* get user  */
    async getUser(req,res) {
        try{
            const user = await User.findById(req.params.id);
            const { password, ...others } = user._doc;
            res.status(200).json( others );
        }catch(err){
            res.status(500).json("error in getting the user data");
        }
    },

    /* get all user  */
    async getAllUser(req,res) {
        /* http://localhost:8000/api/users?new=true -> then return top 5 user */
        /* http://localhost:8000/api/users -> then return all user */
        const query = req.query.new;
        try{
            const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
            res.status(200).json( users );
        }catch(err){
            res.status(500).json("error in getting the user data");
        }
    },

    /* get user stats  */
    async usersStats(req, res){
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() -1))
        // console.log(lastYear); 1:18
    }
}

export default userController;

