import express from "express";
import cors from "cors";
import attendeesRoutes from "./attendees/index.js";

const server = express();

const port = process.env.PORT || 5001;

server.use(cors());
server.use(express.json());

server.use("/attendees", attendeesRoutes);

server.listen(port, () => console.log("Server running on port: ", port));
