// restaurantFoodCategoryController.js
import { 
  createFoodCategory, 
  getFoodCategories,
  getFoodCategoryById,
  updateFoodCategory,
  deleteFoodCategory
} from "../services/restaurantFoodCategoryService.js";

export const addFoodCategory = async (req, res) => {
  try {
    const categoryData = req.body;
    const newCategory = await createFoodCategory(categoryData);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchFoodCategories = async (req, res) => {
  try {
    const categories = await getFoodCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchFoodCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getFoodCategoryById(id);
    if (!category) {
      return res.status(404).json({ error: "Food category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyFoodCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedCategory = await updateFoodCategory(id, updates);
    if (!updatedCategory || updatedCategory.length === 0) {
      return res.status(404).json({ error: "Food category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeFoodCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteFoodCategory(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
