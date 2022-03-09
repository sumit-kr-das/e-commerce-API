import mongoose from "mongoose";
import { DB_CONNECT } from "../config";

const databaseConnection = async() => {
    try{
        await mongoose.connect(DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB Connected...");
    }catch(err){
        console.log(err.message);
    }
}

export default databaseConnection;