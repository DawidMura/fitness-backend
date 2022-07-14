/***************************************************************
 * Diese Controller erstellt die Methode für die Authentifikation
 * beim Einlogen, Auslogen und Registrierung
 * 
 * @postRegister registriert neuer User
 * @postLogin ermöglicht das Einlogen bei korrekten pwd und email
 * @postlogout ermöglicht die Abmeldung beim Browser und  löscht  
 *  die speicherte Cookie in Frontend aus
 ****************************************************************/

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import MemberSchema from "../model/memberSchema.js";
// import "dotenv/config";

// const PORT_CLIENT = process.env.PORT_CLIENT;
// const url = `http://localhost:${PORT_CLIENT}/userPanel`
const EXPIRATION_ACCESSTOKEN = '8h';
const msgAlert = "User/Password combination not found";

/* @postRegister */
export const postRegister = async (req, res) => {
    try {
        const newMember = new MemberSchema(req.body);
        await newMember.save();
        // status 201 the request has succeeded 
        return res.status(201).json({ success: true, insertedData: newMember })
    } catch (error) {
        res.status(200).json({ error: error.message })
    }
}

/* @postLogin */
export const postLogin = async (req, res) => {
    const { email, password } = req.body;
    // role implementieren

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


    //const expiresInMs = 24 * 60 * 60 * 1000 // 86400 * (10)³
    const expiresInMs = 24 * 60 * 60 * 1000 // 1 h
    const expiresInDate = new Date(Date.now() + expiresInMs)

    /* @accessToken, hier wird unsere Token-generator erstellt, */
    const accessToken = jwt.sign(
        {
            email: loggingUser.email,
            userId: loggingUser._id,
            role: loggingUser.role,
        }
        , process.env.TOKEN_SECRET,
        { expiresIn: EXPIRATION_ACCESSTOKEN }
    );


    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: expiresInMs
    });


    res.cookie('isLogged', expiresInDate.toISOString(), {
        httpOnly: false,
        maxAge: expiresInMs,
        role: loggingUser.role,
        // TODO sicherer machen: FRONTEND => auslesen über accessToken
    })


    return res.status(200).json({ msg: 'successfully logged in', accessToken: accessToken, email: loggingUser.email })
}

/* @postLogout */
export const postLogout = async (req, res) => {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) return res.sendStatus(204);
    res.clearCookie('accessToken');
    res.clearCookie('isLogged')

    return res.status(200).json({ msg: 'successfully logged out' })
}




// try {
//     const adminId = ObjectId("62ca9e2e4f6f8e1abdd76eb1");
//     const isAdmin = await MemberSchema.find({ _id: adminId })
//     res.send(isAdmin);
// }

// catch (error) {
//     return res.status(401).json({ error: msgAlert })
// }