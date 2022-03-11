import express from "express";
const routes = express.Router();

import { 
    registerController, 
    loginController, 
    userController 
} from "../controller";

import { 
    verifyToken, 
    verifyTokenAndAdmin, 
    verifyTokenAndAuthorization 
} from '../middlewares/verifyToken';

routes.post("/register", registerController.register);
routes.post("/login", loginController.login);
routes.put("/users/:id",verifyTokenAndAuthorization, userController.updateUser);
routes.delete("/users/:id", verifyTokenAndAuthorization, userController.deleteUser);
routes.get("/users/find/:id", verifyTokenAndAdmin, userController.getUser);
routes.get("/users", verifyTokenAndAdmin, userController.getAllUser);
routes.get("/stats", verifyTokenAndAdmin, userController.usersStats);

export default routes;
