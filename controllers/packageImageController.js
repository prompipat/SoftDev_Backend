import {
  createPackageImage,
  getPackageImages,
  getPackageImageById,
  updatePackageImage,
  deletePackageImage,
} from "../services/packageImageService.js";

export const addPackageImage = async (req, res) => {
  try {
    const packageImageData = req.body;
    const newImage = await createPackageImage(packageImageData);
    res.status(201).json(newImage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchPackageImages = async (req, res) => {
  try {
    const images = await getPackageImages();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchPackageImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await getPackageImageById(id);
    if (!image) {
      return res.status(404).json({ error: "Package image not found" });
    }
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyPackageImage = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedImage = await updatePackageImage(id, updates);
    if (!updatedImage || updatedImage.length === 0) {
      return res.status(404).json({ error: "Package image not found" });
    }
    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removePackageImage = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deletePackageImage(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
