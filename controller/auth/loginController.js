import User from "../../models/User";
import { PASS_SEC } from "../../config";
import CryptoJS from "crypto-js";

const loginController = {
    async login(req,res) {
        try{
            const { username, userPassword } = req.body;

            const isExist = await User.findOne({ username });

            !isExist && res.status(401).json({ err: "wrong credentials !" });

            const decriptPassword  = CryptoJS.AES.decrypt(isExist.password, PASS_SEC);
            const hashedPassword = decriptPassword.toString(CryptoJS.enc.Utf8);

            hashedPassword !== userPassword && res.status(401).json({ err: "wrong credentials !" });

            const { password, ...others} = isExist._doc;

            res.status(200).json(others);

        }catch(err){
            res.status(401).json({ err: "user login error" });
        }
    }
}

export default loginController;