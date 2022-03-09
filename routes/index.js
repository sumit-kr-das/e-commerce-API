import express from "express";
const routes = express.Router();

import { registerController, loginController } from "../controller";

routes.post("/register", registerController.register);
routes.post("/login", loginController.login);

export default routes;
