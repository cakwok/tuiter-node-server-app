import mongoose from "mongoose";
import restaurantLikesSchema from "./schema.js";

const restaurantLikesModel = mongoose.model("restaurantLikes", restaurantLikesSchema);

export default restaurantLikesModel;