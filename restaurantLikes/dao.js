import restaurantLikesModel from "./model.js";

export const getUserLikesRestaurant = (userId, restaurantId) =>
  restaurantLikesModel.findOne({ user: userId, restaurantId });
export const userLikesRestaurant = (user, restaurant, restaurantId) =>
  restaurantLikesModel.create({ user, restaurant, restaurantId });
export const userUnlikesRestaurant = (userId, restaurantId) =>
  restaurantLikesModel.deleteOne({ user: userId, restaurant: restaurantId });
export const getLikesForUser = (userId) =>
  restaurantLikesModel.find({ user: userId }).populate("restaurant", "name");
export const getLikesForRestaurant = (restaurantId) =>
  restaurantLikesModel.find({ restaurantId }).populate("user");