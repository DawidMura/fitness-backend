import express from "express";
import isAuth from "../middleware/is-auth.js";


const router = express.Router()

// *** "Playground" ****
// callbacks sind hier nicht in controller ausgelagert

// router.post("/json", (req, res) => {
//   res.json({success:true, dataaaa: {email: req.body.email, pwd: req.body.pwd }});
// })

// Endpoint nur erreichbar, wenn authorisiert
router.get("/userPanel", isAuth, (req, res) => {

    res.json({
        success: true
    });
})

export default router;

