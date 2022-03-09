import User from "../../models/User";
import { PASS_SEC, JWT_SECRET } from "../../config";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const loginController = {
    async login(req,res) {
        try{
            const isExist = await User.findOne({ username: req.body.username });

            !isExist && res.status(401).json({ err: "wrong credentials !" });

            const decriptPassword  = CryptoJS.AES.decrypt(isExist.password, PASS_SEC);
            const hashedPassword = decriptPassword.toString(CryptoJS.enc.Utf8);

            hashedPassword !== req.body.password && res.status(401).json({ err: "wrong credentials !" });

            const accessToken = jwt.sign({
                id: isExist._id,
                idAdmin: isExist.isAdmin,
            },JWT_SECRET, { expiresIn: "3d" });

            const { password, ...others} = isExist._doc;

            res.status(200).json({ ...others, accessToken });

        }catch(err){
            res.status(401).json({ err: "user login error" });
        }
    }
}

export default loginController;