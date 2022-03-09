import express from "express";
import routes from "./routes";
import databaseConnection from "./connection/databaseConnection";
const app = express();
import { PORT_NO } from "./config";

/* database connection */
databaseConnection();

app.use(express.json());
/* import routes */
app.use("/api", routes);

app.listen(PORT_NO, () => console.log(`Listening on port no ${PORT_NO}`));
