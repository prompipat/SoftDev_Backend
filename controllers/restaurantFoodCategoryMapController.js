// restaurantFoodCategoryMapController.js
import {
  createRestaurantFoodCategoryMap,
  getAllRestaurantFoodCategoryMaps,
  getRestaurantFoodCategoryMapById,
  updateRestaurantFoodCategoryMap,
  deleteRestaurantFoodCategoryMap,
} from "../services/restaurantFoodCategoryMapService.js";

export const addRestaurantFoodCategoryMap = async (req, res) => {
  try {
    const mapData = req.body;
    const newMap = await createRestaurantFoodCategoryMap(mapData);
    res.status(201).json(newMap);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchRestaurantFoodCategoryMaps = async (req, res) => {
  try {
    const maps = await getAllRestaurantFoodCategoryMaps();
    res.status(200).json(maps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchRestaurantFoodCategoryMapById = async (req, res) => {
  try {
    const { id } = req.params;
    const map = await getRestaurantFoodCategoryMapById(id);
    if (!map) {
      return res.status(404).json({ error: "Mapping not found" });
    }
    res.status(200).json(map);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyRestaurantFoodCategoryMap = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedMap = await updateRestaurantFoodCategoryMap(id, updates);
    if (!updatedMap || updatedMap.length === 0) {
      return res.status(404).json({ error: "Mapping not found" });
    }
    res.status(200).json(updatedMap);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeRestaurantFoodCategoryMap = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteRestaurantFoodCategoryMap(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
