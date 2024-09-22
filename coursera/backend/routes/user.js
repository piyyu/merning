const { Router } = require("express");
const userRouter = Router();
const jwt = require('jsonwebtoken');
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;
const bcrypt = require('bcrypt');
const { UserModel } = require("../db");
const { UserSchema } = require("../types")

userRouter.post("/signup", async (req, res) => {
    const parsedData = UserSchema.safeParse(req.body)

    if(!parsedData.success){
        res.json({
            msg: "Invalid data",
            error: parsedData.error
        })
        return;
    }

    const { email, firstName, lastName, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        await UserModel.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword
        })
    } catch (error) {
        res.status(400).json({
            msg: "User already exists"
          })
          return;
    } 
    res.json({
        msg: "User created successfully"
    })
})

userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await UserModel.findOne({ email: email });
        if (!response) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        const passwordMatch = await bcrypt.compare(password, response.password);
        if (!passwordMatch) {
            return res.status(401).json({
                msg: "Invalid password"
            });
        }

        const token = jwt.sign({ id: response._id.toString() }, JWT_USER_SECRET);
        res.status(200).json({
            msg: "User signed in successfully",
            token: token,
            name: response.firstName + " " + response.lastName
        });
    } catch (error) {
        res.status(500).json({
            msg: "Server error"
        });
    }
});

function authMiddleware(req, res, next) {
    const token = req.headers.token;
    if(!token){
        res.status(401).json({
            msg: "Unauthorized"
        })
        return;
    }
    const decoded = jwt.verify(token, JWT_USER_SECRET);
    console.log(decoded)
    if(decoded) {
        req.userId = decoded.id;
        next();
    } else {
        res.status(401).json({
            msg: "unauthorized"
        })
    }
}

userRouter.get("/purchases", authMiddleware, async (req, res) => {
    
})

module.exports = {
    userRouter: userRouter
}