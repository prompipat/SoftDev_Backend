// restaurantMainCategoryController.js
import { 
  createMainCategory, 
  getMainCategories,
  getMainCategoryById,
  updateMainCategory,
  deleteMainCategory
} from "../services/restaurantMainCategoryService.js";

export const addMainCategory = async (req, res) => {
  try {
    const categoryData = req.body;
    const newCategory = await createMainCategory(categoryData);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchMainCategories = async (req, res) => {
  try {
    const categories = await getMainCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchMainCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getMainCategoryById(id);
    if (!category) {
      return res.status(404).json({ error: "Main category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyMainCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedCategory = await updateMainCategory(id, updates);
    if (!updatedCategory || updatedCategory.length === 0) {
      return res.status(404).json({ error: "Main category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeMainCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteMainCategory(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
