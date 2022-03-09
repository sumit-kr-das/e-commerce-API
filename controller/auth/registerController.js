import User from "../../models/User";
import { PASS_SEC } from '../../config';
import CryptoJS from "crypto-js";

const registerController = {
    async register(req,res){
        const { username, email, password } = req.body;

        const encryptPassword = CryptoJS.AES.encrypt(password, PASS_SEC).toString();

        const newUser = new User({ username, email, password: encryptPassword });

        let saveUser;
        try{
            saveUser = await newUser.save();
            if(!saveUser) {
                res.status(401).json({ err: "user register error" });
            }
        }catch(err){
            res.status(401).json({ err: "user register error" });
        }

        res.status(201).json(saveUser);
    }
}

export default registerController;