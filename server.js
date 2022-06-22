import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import connectToMongoose from "./util/mongoose_connect.js";
import authRoute from "./routes/auth-routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.get("/", (req, res) => {
    res.send("Welcome");
})
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 
app.use(authRoute);
app.use(cookieParser());
app.use(express.static('./public'))

const PORT = process.env.PORT || 4001;

// connect to database
if (await connectToMongoose()) {
    app.listen(PORT, (err) => {
        if (err) console.error(err);
        console.log(`listening to Port ${PORT}`);
    });
}

