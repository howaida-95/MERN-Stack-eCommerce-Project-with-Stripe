// create a basic server
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
// app config
/*
it returns an Express application instance (app), which acts as the backbone of your
it provides methods to:
  - Define routes  (e.g., app.get(), app.post()).
  - Configure middleware (e.g., app.use())
  - Start the server (e.g., app.listen())
*/
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
// middleware
app.use(cors({})); // so we can access backend from any ip
app.use(express.json());

// api endpoints
app.get("/", (req, res) => {
    res.send("api working");
});

// start the server
app.listen(4000, () => {
    console.log(`server started on port ${port}`);
});
