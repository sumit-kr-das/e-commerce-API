import { PASS_SEC } from "../../config";
import jwt from "jsonwebtoken";
import User from "../../models/User";

const userController = {
    /* update password */
    async user(req,res) {
        if(req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, PASS_SEC).toString();
        }
        try{
            const updatedUser = await User.findByIdAndUpdate({
                $set: req.body
            },{ new: true });
            res.status(200).json(updatedUser);
        }catch(err){
            res.status(500).json(err);
        }
    }
}

export default userController;

