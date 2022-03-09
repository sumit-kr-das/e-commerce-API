import express from "express";
const app = express();
import { PORT_NO } from './config';
import routes from './routes';


app.use("/api",routes);


app.listen(PORT_NO, () => console.log(`Listening on port no ${PORT_NO}`));