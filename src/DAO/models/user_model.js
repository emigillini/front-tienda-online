import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true},
    password: String,
    age: Number,
    role: { type: String, default: "usuario" }
});

export const userModel = mongoose.model(usersCollection, userSchema)