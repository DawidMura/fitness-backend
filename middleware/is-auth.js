import express from "express";
import jwt from "jsonwebtoken";
import MemberSchema from "../model/memberSchema.js";
import "dotenv/config";
const PORT_CLIENT = process.env.PORT_CLIENT;
const url = `http://localhost:${PORT_CLIENT}/userPanel`
export default async (req, res, next) => {
  console.log("headers: ", req.headers)
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

  const user = await MemberSchema.findById({ _id: memberId });
  console.log(user);

  if (user.roles === "admin") {
    return res.send("<h2>Admin Page </h2>")
  }
  else {
    return res.sendStatus(404);

  }
  next();
}




