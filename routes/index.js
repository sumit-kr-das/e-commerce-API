import express from "express";
const routes = express.Router();

import { 
    registerController
} from '../controller';


routes.get("/", registerController.register);


export default routes;