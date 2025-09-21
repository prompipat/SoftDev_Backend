import{
    createPackageCategory,
    getPackageCategories,
    getPackageCategoryById,
    updatePackageCategory,
    deletePackageCategory,
    getPackageCategoriesByRestaurant
} from "../services/packageCategoryService.js";

export const addPackageCategory = async (req, res) => {
    try {
        const categoryData = req.body;
        const newCategory = await createPackageCategory(categoryData);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const fetchPackageCategories = async (req, res) => {
    try {
        const categories = await getPackageCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const fetchPackageCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await getPackageCategoryById(id);
        if (!category) {
            return res.status(404).json({ error: "Package Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const modifyPackageCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedCategory = await updatePackageCategory(id, updates);
        if (!updatedCategory || updatedCategory.length === 0) {
            return res.status(404).json({ error: "Package Category not found" });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const removePackageCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deletePackageCategory(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const fetchPackageCategoriesByRestaurant = async (req, res) => {
  try {
    const { restaurant_id } = req.params;
    const categories = await getPackageCategoriesByRestaurant(restaurant_id);
    if (!categories || categories.length === 0) {
      return res.status(404).json({ error: "No package categories found for this restaurant" });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};