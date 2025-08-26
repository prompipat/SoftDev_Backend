import { 
  createCategory, 
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../services/categoryService.js";

export const addCategory = async (req, res) => {
  try {
    const categoryData = req.body;
    const newCategory = await createCategory(categoryData);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchCategories = async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedCategory = await updateCategory(id, updates);
    if (!updatedCategory || updatedCategory.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await deleteCategory(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};