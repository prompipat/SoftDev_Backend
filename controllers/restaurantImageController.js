import {
  createRestaurantImage,
  getRestaurantImages,
  getRestaurantImageById,
  updateRestaurantImage,
  deleteRestaurantImage,
} from "../services/restaurantImageService.js";

export const addRestaurantImage = async (req, res) => {
  try {
    const restaurantImageData = req.body;
    const newImage = await createRestaurantImage(restaurantImageData);
    res.status(201).json(newImage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchRestaurantImages = async (req, res) => {
  try {
    const images = await getRestaurantImages();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchRestaurantImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await getRestaurantImageById(id);
    if (!image) {
      return res.status(404).json({ error: "Restaurant image not found" });
    }
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyRestaurantImage = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedImage = await updateRestaurantImage(id, updates);
    if (!updatedImage || updatedImage.length === 0) {
      return res.status(404).json({ error: "Restaurant image not found" });
    }
    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeRestaurantImage = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteRestaurantImage(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
