const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "foodappBtingIt123";

router.post("/createuser",
    [
        body('email').isEmail(),
        body('password', 'Incorrect password').isLength({ min: 6 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
                location: req.body.location
            })

            res.json({ success: true })
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    });


router.post("/loginuser",
    [
        body('email').isEmail(),
        body('password', 'Incorrect password').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const email = req.body.email;
        try {
            let userData = await User.findOne({email});
            if (!userData) {
                return res.status(400).json({ errors: "Invalid data" })
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);

            if (!pwdCompare) {
                return res.status(400).json({ errors: "Password does not match" })
            }

            const data = {
                user:{
                    id:userData._id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);

            res.json({ success: true , authToken:authToken})
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    })



module.exports = router;