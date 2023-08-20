import mongoose from "mongoose";
import userSchema from "./schema.js";

const User = mongoose.model("users", userSchema);

export default User;