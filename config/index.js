import dotenv from "dotenv";
dotenv.config();

export const { 
    PORT_NO,
    DB_CONNECT,
    PASS_SEC,
    JWT_SECRET
} = process.env;
