const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
PORT = process.env.PORT || 3001;
const { UserModel, TodoModel } = require("./db")

mongoose.connect(process.env.MONGODB_URL);
const app = express();
app.use(express.json());

app.post('/signup', async (req, res) => {
  const email =  req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  await UserModel.create({
    email: email,
    password: password,
    name: name
  })

  res.json({
    msg: "User created successfully"
  })

});

app.post("/signin", async (req, res) => { 
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email: email,
    password: password
  })

  if(user) {
    const token = jwt.sign({id: user._id}, secretKey);

    res.json({
      msg: "User logged in successfully",
      token: token
    })
  } else {
    res.status(403).json({  
      msg: "wrong credentials"
    })
  }
})

function authMiddleware(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, secretKey);
  if(decoded) {
    req.userId = decoded.userId;
    next();
  } else {
    res.status(403).json({
      msg: "incorrect credentials"
    })
  }
}

app.post("/todo", authMiddleware, (req, res) => {
  const userId = req.userId;

  TodoModel.create({
    userId: userId,
    title: req.body.title,
    done: req.body.done
  })

  res.json({
    msg: "todo added successfully",
    userId: userId
  })
})

app.get("/todos", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const todos = await TodoModel.find({userId: userId});

  res.json({
    msg: "todos fetched successfully",
    todos: todos
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});