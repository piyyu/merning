const { Router } = require("express");
const adminRouter = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
const { AdminModel } = require("../db");
const { AdminSchema } = require("../types");

adminRouter.post("/signup", async (req, res) => {
    const parsedData = AdminSchema.safeParse(req.body);
    console.log(parsedData)
    if (!parsedData.success) {
        res.json({
            msg: "Invalid data",
            error: parsedData.error
        })
        return;
    }

    const { email, firstName, lastName, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        await AdminModel.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword

        })
    } catch (error) {
        res.status(400).json({
            msg: "User already exists"
        })
        errorthrown = true;
        return;
    }

    res.json({
        msg: "User created successfully"
    })
})

adminRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    const response = await AdminModel.findOne({ email: email });
    if (!response) {
        res.json({
            msg: "User not found"
        })
        return;
    }

    const passwordMatch = await bcrypt.compare(password, response.password);
    if (!passwordMatch) {
        res.json({
            msg: "Invalid password"
        })
        return;
    }

    const token = jwt.sign({ id: response._id.toString() }, JWT_ADMIN_SECRET);
    res.json({
        msg: "Admin signed in successfully",
        token: token
    })
})

function authMiddleware(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({
            msg: "Unauthorized"
        })
        return;
    }

    const decoded = jwt.verify(token, JWT_ADMIN_SECRET);

    console.log(decoded)
    if (decoded) {
        req.userId = decoded.id;
        next();
    } else {
        res.status(401).json({
            msg: "unauthorized"
        })
    }
}

adminRouter.post("/course", authMiddleware, async (req, res) => {

})

adminRouter.get("/course/bulk", (req, res) => {
    res.json({
        message: "signup endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}