import {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from "../services/restaurantService.js";

export const addRestaurant = async (req, res) => {
  try {
    const restaurantData = req.body;
    const newRestaurant = await createRestaurant(restaurantData);
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchRestaurants = async (req, res) => {
  try {
    const restaurants = await getRestaurants();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await getRestaurantById(id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedRestaurant = await updateRestaurant(id, updates);
    if (!updatedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteRestaurant(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
