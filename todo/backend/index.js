const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
PORT = process.env.PORT || 3001;
const { UserModel, TodoModel } = require("./db")
const { userSchema, todoSchema } = require("./types")

mongoose.connect(process.env.MONGODB_URL);
const app = express();
app.use(express.json());

app.post('/signup', async (req, res) => {
  const parsedDataWithSuccess = userSchema.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res.status(400).json({
      msg: "Invalid data",
      errors: parsedDataWithSuccess.error
    })
    return;
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  let errorthrown = false;

  try {
    const hashedPassword = await bcrypt.hash(password, 5);

    await UserModel.create({
      email: email,
      password: hashedPassword,
      name: name
    })

  } catch (error) {
    res.status(400).json({
      msg: "User already exists"
    })
    errorthrown = true;
    return;
  }

  if (!errorthrown) {
    res.json({
      msg: "User created successfully"
    })
  }

});

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const response = await UserModel.findOne({
    email: email
  })

  if (!response) {
    res.status(403).json({
      msg: "User not found"
    })
    return;
  }

  const passwordMatch = await bcrypt.compare(password, response.password);

  if (passwordMatch) {
    const token = jwt.sign({ id: response._id.toString() }, secretKey);

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
  if (decoded) {
    req.userId = decoded.userId;
    next();
  } else {
    res.status(403).json({
      msg: "incorrect credentials"
    })
  }
}

app.post("/todo", authMiddleware, (req, res) => {
  const parsedDataWithSuccess = todoSchema.safeParse(req.body);
  if (!parsedDataWithSuccess.success) {
    res.status(400).json({
      msg: "Invalid data",
      errors: parsedDataWithSuccess.error.errors
    })
    return;
  }

  const userId = req.userId;
  const title = req.body.title;
  const description = req.body.description;
  const done = false;

  TodoModel.create({
    userId: userId,
    title: title,
    description: description,
    done: done
  })

  res.json({
    msg: "todo added successfully",
    userId: userId
  })
})

app.get("/todos", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const todos = await TodoModel.find({ userId: userId });

  res.json({
    msg: "todos fetched successfully",
    todos: todos
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
