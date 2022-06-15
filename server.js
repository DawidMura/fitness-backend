import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import connectToMongoose from "./util/mongoose_connect.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 

const PORT = process.env.PORT || 4000;

// connect to database
if (await connectToMongoose()) {
    app.listen(PORT, (err) => {
        if (err) console.error(err);
        console.log(`listening to Port ${PORT}`);
    });
}

