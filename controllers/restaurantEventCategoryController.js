// restaurantEventCategoryController.js
import { 
  createEventCategory, 
  getEventCategories,
  getEventCategoryById,
  updateEventCategory,
  deleteEventCategory
} from "../services/restaurantEventCategoryService.js";

export const addEventCategory = async (req, res) => {
  try {
    const categoryData = req.body;
    const newCategory = await createEventCategory(categoryData);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchEventCategories = async (req, res) => {
  try {
    const categories = await getEventCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchEventCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getEventCategoryById(id);
    if (!category) {
      return res.status(404).json({ error: "Event category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyEventCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedCategory = await updateEventCategory(id, updates);
    if (!updatedCategory || updatedCategory.length === 0) {
      return res.status(404).json({ error: "Event category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeEventCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteEventCategory(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
