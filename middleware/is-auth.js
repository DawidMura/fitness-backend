import express from "express";
import jwt from "jsonwebtoken";
import MemberSchema from "../model/memberSchema.js";
import "dotenv/config";
const PORT_CLIENT = process.env.PORT_CLIENT;
const url = `http://localhost:${PORT_CLIENT}/userPanel`

export default async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader.startsWith('Bearer ')) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  console.log(token);
  if (!token) return res.sendStatus(401);

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if (decodedToken) {
      req.userId = decodedToken.userId;
      req.email = decodedToken.email;
    }
  } catch (error) {
    console.debug("JWT Verification Error:", error.message);
    return res.sendStatus(403); // ungültiges Token
  }
  next();
}


export const authRole = async (req, res, next) => {
  const memberId = req.params.memberId;

  const adminArray = await MemberSchema.find({ _id: memberId, roles: "admin" });
  console.log(adminArray);

  if (adminArray.length > 0) {
    return res.send("<h2>Admin Page </h2>")
  }
  else {
    return res.redirect(url);

  }
  next();
}




