import restaurantModel from "./model.js";

export const createRestaurant = (restaurant) => restaurantModel.create(restaurant);
export const getRestaurants = () => restaurantModel.find();
export const getRestaurantByRestaurantId = (restaurantId) => restaurantModel.findOne({ restaurantId });
export const getRestaurantById = (id) => restaurantModel.findById(id);