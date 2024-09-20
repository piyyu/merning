const { z } = require("zod");

const userSchema = z.object({
  email: z.string().min(3).max(100).email(),
  password: z.string().min(3).max(30),
  name: z.string().min(3).max(100)
}).strict();

const todoSchema = z.object({
  title: z.string().min(1).max(30),
  description: z.string().min(1).max(100),
}).strict();

module.exports = {
  userSchema: userSchema,
  todoSchema: todoSchema
}