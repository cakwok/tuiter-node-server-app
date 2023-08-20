import mongoose from "mongoose";
import restaurantSchema from "./schema.js";

const restaurantModel = mongoose.model("restaurant", restaurantSchema);

export default restaurantModel;