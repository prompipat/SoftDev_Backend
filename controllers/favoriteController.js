import {
  createFavorite,
  getFavorites,
  getFavoriteById,
  updateFavorite,
  deleteFavorite,
  getFavoritesByUser
} from "../services/favoriteService.js";

export const addFavorite = async (req, res) => {
  try {
    const favoriteData = req.body;
    favoriteData.user_id = req.user.userData.id;

    const newFavorite = await createFavorite(favoriteData);
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchFavorites = async (req, res) => {
  try {
    const favorites = await getFavorites();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchFavoriteById = async (req, res) => {
  try {
    const { id } = req.params;
    const favorite = await getFavoriteById(id);
    if (!favorite) {
      return res.status(404).json({ error: "Favorite not found" });
    }
    res.status(200).json(favorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedFavorite = await updateFavorite(id, updates);
    if (!updatedFavorite || updatedFavorite.length === 0) {
      return res.status(404).json({ error: "Favorite not found" });
    }
    res.status(200).json(updatedFavorite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteFavorite(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchMyFavorites = async (req, res) => {
  try {
    const userId = req.user.userData.id;
    const favorites = await getFavoritesByUser(userId);
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
