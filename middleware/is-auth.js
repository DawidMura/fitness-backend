import express from "express";
import jwt from "jsonwebtoken";

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