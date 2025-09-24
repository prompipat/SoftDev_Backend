import {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  getPackagesByCategory
} from "../services/packageService.js";

export const addPackage = async (req, res) => {
  try {
    const packageData = req.body;
    const newPackage = await createPackage(packageData);
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchPackages = async (req, res) => {
  try {
    const packages = await getPackages();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const packageData = await getPackageById(id);
    if (!packageData) {
      return res.status(404).json({ error: "Package not found" });
    }
    res.status(200).json(packageData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchPackagesByCategory = async (req, res) => {
  try {
    const { category_id, restaurant_id } = req.params;
    const packages = await getPackagesByCategory(category_id, restaurant_id);
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const modifyPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedPackage = await updatePackage(id, updates);
    if (!updatedPackage) {
      return res.status(404).json({ error: "Package not found" });
    }
    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deletePackage(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
