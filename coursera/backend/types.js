const { z } = require("zod");

const AdminSchema = z.object({
    email: z.string().min(3).max(100).email(),
    firstName: z.string().max(100),
    lastName: z.string().max(100),
    password: z.string().max(100),
}).strict();

const UserSchema = z.object({
    email: z.string().min(3).max(100).email(),
    firstName: z.string().max(100),
    lastName: z.string().max(100),
    password: z.string().max(100),
}).strict();

module.exports = {
    AdminSchema: AdminSchema,
    UserSchema: UserSchema,
}