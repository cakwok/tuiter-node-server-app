import mongoose from "mongoose";

const restaurantLikesSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurants",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    restaurantId: String,
  },
  {
    collection: "restaurantLikes",
  }
);

export default restaurantLikesSchema;