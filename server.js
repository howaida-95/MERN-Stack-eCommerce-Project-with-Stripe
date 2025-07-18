// create a basic server
import express from "express";
import cors from "cors";
import "dotenv/config";

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

// middleware
app.use(express.json());
app.use(cors()); // so we can access backend from any ip

// api endpoints
app.get("/", (req, res) => {
    res.send("api working");
});

// start the server
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
