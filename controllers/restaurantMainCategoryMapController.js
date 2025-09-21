// restaurantMainCategoryMapController.js
import {
  createRestaurantMainCategoryMap,
  getAllRestaurantMainCategoryMaps,
  getRestaurantMainCategoryMapById,
  updateRestaurantMainCategoryMap,
  deleteRestaurantMainCategoryMap,
} from "../services/restaurantMainCategoryMapService.js";

export const addRestaurantMainCategoryMap = async (req, res) => {
  try {
    const mapData = req.body;
    const newMap = await createRestaurantMainCategoryMap(mapData);
    res.status(201).json(newMap);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchRestaurantMainCategoryMaps = async (req, res) => {
  try {
    const maps = await getAllRestaurantMainCategoryMaps();
    res.status(200).json(maps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchRestaurantMainCategoryMapById = async (req, res) => {
  try {
    const { id } = req.params;
    const map = await getRestaurantMainCategoryMapById(id);
    if (!map) {
      return res.status(404).json({ error: "Mapping not found" });
    }
    res.status(200).json(map);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyRestaurantMainCategoryMap = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedMap = await updateRestaurantMainCategoryMap(id, updates);
    if (!updatedMap || updatedMap.length === 0) {
      return res.status(404).json({ error: "Mapping not found" });
    }
    res.status(200).json(updatedMap);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeRestaurantMainCategoryMap = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteRestaurantMainCategoryMap(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
