import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import MemberSchema from "../model/memberSchema.js";

const EXPIRATION_ACCESSTOKEN = '15m';
const msgAlert = "User/Password combination not found";

export const postRegister = async (req, res) => {
    // const { email } = req.body;
    try {
        // let isEmailAlreadyInUse = await MemberSchema.find({ email });

        // if (isEmailAlreadyInUse) {
        //     res.status(401).json({ success: false, msg: "Email is already in use. Try again with another email" });
        // }
        // else { }
        const newMember = new MemberSchema(req.body)
        await newMember.save();
        // status 201 the request has succeeded 
        return res.status(201).json({ success: true, insertedData: newMember })


    } catch (error) {
        res.status(200).json({ error: error.message })
    }
}


export const postLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(401).json({ success: false, error: 'Provide Password and Email' });

    let loggingUser;
    try {
        loggingUser = await MemberSchema.findOne({ email })
        if (!loggingUser) return res.status(401).json({ error: msgAlert });

    } catch (error) {
        console.error(error);
        return res.json({ error: error.message });
    }

    try {
        const isPwdCorrect = await bcrypt.compare(password, loggingUser.password)
        // 401 - Unauthorized
        if (!isPwdCorrect) return res.status(401).json({ error: msgAlert });

    } catch (error) {
        console.error({ error })
        // 500 - Internal Server Error
        return res.status(500).json({ error })
    }

    // const expiresInMs = 1 * 60 * 1000 // 1 m
    const expiresInMs = 24 * 60 * 60 * 1000 // 1 h
    const expiresInDate = new Date(Date.now() + expiresInMs)


    const accessToken = jwt.sign(
        {
            userName: loggingUser.name,
            userId: loggingUser._id
        }
        , process.env.TOKEN_SECRET,
        { expiresIn: EXPIRATION_ACCESSTOKEN }
    );

    const refreshToken = jwt.sign(
        { userId: loggingUser._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: expiresInMs / 1000 }
    );

    // Refreshtoken is saved in our database
    const resMongo = await UserModel.updateOne({ _id: loggingUser._id }, { refreshToken })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: expiresInMs
    });

    res.cookie('isLogged', expiresInDate.toISOString(), {
        httpOnly: false,
        maxAge: expiresInMs
    })

    // status 200 means success
    return res.status(200).json({ msg: 'successfully logged in', accessToken, userName: loggingUser.name })
}
