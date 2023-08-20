import * as likesDao from "./dao.js";
import * as restaurantDao from "../restaurants/dao.js";

function RestaurantLikesRoutes(app) {
  const userLikesRestaurant = async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const userId = currentUser._id;
    const restaurantId = req.params["restaurantId"];

    const likes = await likesDao.getUserLikesRestaurant(userId, restaurantId);
    if (likes) {
      res.sendStatus(200);
      return;
    }

    let restaurant = await restaurantDao.getRestaurantByRestaurantId(restaurantId);
    if (!restaurant) {
      restaurant = await restaurantDao.createRestaurant(req.body);
    }

    const actualLikes = await likesDao.userLikesRestaurant(
      userId,
      restaurant._id,
      restaurantId
    );
    res.json(actualLikes);
  };

  const getLikesForUser = async (req, res) => {
    const userId = req.params.userId;
    const likes = await likesDao.getLikesForUser(userId);
    res.json(likes);
  };
  const getLikesForRestaurant = async (req, res) => {
    const restaurantId = req.params.restaurantId;
    const likes = await likesDao.getLikesForRestaurant(restaurantId);
    res.json(likes);
  };
  app.get("/api/restaurants/:restaurantId/likes", getLikesForRestaurant);
  app.get("/api/users/:userId/likes", getLikesForUser);
  app.post("/api/restaurants/:restaurantId/likes", userLikesRestaurant);
}

export default RestaurantLikesRoutes;