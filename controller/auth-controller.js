import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import MemberSchema from "../model/memberSchema.js";

const EXPIRATION_ACCESSTOKEN = '10m';
const msgAlert = "User/Password combination not found";

/******************************************************
 * Das ist die Function @postRegister, die für die
 * Registrierung neue User bzw. Mitglied zuständig ist.
 ******************************************************/
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

/******************************************************
 * Die @postLogin Function, wird aufgerufen, wenn der User/Mitglied
 * schon registriert wurde, ansonst bekommt er eine Rückmeldung
 * 'Provide Password and Email', 
 * 
 ******************************************************/
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

    // convert time to Millisekunden
    //const expiresInMs = 24 * 60 * 60 = 86400 seconds
    //const expiresInMs = 24 * 60 * 60 * 1000 // 86400 * (10)³
    const expiresInMs = 24 * 60 * 60 * 1000 // 1 h
    const expiresInDate = new Date(Date.now() + expiresInMs)

    /* Hier findet unsere token-generator @accessToken statt, */
    const accessToken = jwt.sign(
        {
            email: loggingUser.email,
            userId: loggingUser._id
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
        maxAge: expiresInMs
    })

    // status 200 means success
    return res.status(200).json({ msg: 'successfully logged in', accessToken, userName: loggingUser.name })
}

/******************************************************
 * function @logout, ermöglicht die Abmeldung von Browser und  löscht  
 * die speicherte Cookie von Frontend aus.
 ******************************************************/

export const postLogout = async (req, res) => {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) return res.sendStatus(204);
    res.clearCookie('accessToken');
    res.clearCookie('isLogged')

    return res.status(200).json({ msg: 'successfully logged out' })
}