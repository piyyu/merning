const { Router } = require("express");
const courseRouter = Router();
const { CourseModel } = require("../db");

courseRouter.post("/purchase", function(req, res) {
    res.json({
        message: "purchase endpoint"
    })
})

courseRouter.get("/preview", function(req, res) {
    res.json({
        message: "preview endpoint"
    })
})

module.exports = {
    courseRouter: courseRouter
}