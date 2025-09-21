// restaurantEventCategoryMapController.js
import {
  createRestaurantEventCategoryMap,
  getAllRestaurantEventCategoryMaps,
  getRestaurantEventCategoryMapById,
  updateRestaurantEventCategoryMap,
  deleteRestaurantEventCategoryMap,
} from "../services/restaurantEventCategoryMapService.js";

export const addRestaurantEventCategoryMap = async (req, res) => {
  try {
    const mapData = req.body;
    const newMap = await createRestaurantEventCategoryMap(mapData);
    res.status(201).json(newMap);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchRestaurantEventCategoryMaps = async (req, res) => {
  try {
    const maps = await getAllRestaurantEventCategoryMaps();
    res.status(200).json(maps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchRestaurantEventCategoryMapById = async (req, res) => {
  try {
    const { id } = req.params;
    const map = await getRestaurantEventCategoryMapById(id);
    if (!map) {
      return res.status(404).json({ error: "Mapping not found" });
    }
    res.status(200).json(map);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyRestaurantEventCategoryMap = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedMap = await updateRestaurantEventCategoryMap(id, updates);
    if (!updatedMap || updatedMap.length === 0) {
      return res.status(404).json({ error: "Mapping not found" });
    }
    res.status(200).json(updatedMap);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeRestaurantEventCategoryMap = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteRestaurantEventCategoryMap(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
