import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: String,
    restaurantId: String,
  },
  { collection: "restaurants" }
);

export default restaurantSchema;