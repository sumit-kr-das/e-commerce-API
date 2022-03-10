import express from "express";
const routes = express.Router();

import { registerController, loginController, userController } from "../controller";

import { verifyTokenAndAuthorization } from '../middlewares/verifyToken';

routes.post("/register", registerController.register);
routes.post("/login", loginController.login);
routes.put("/users/:id",verifyTokenAndAuthorization, userController.user);

export default routes;
