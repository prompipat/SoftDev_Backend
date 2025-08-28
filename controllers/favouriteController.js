
import {
    createFavourite,
    getFavourite,
    getFavouriteById,
    updateFavourite,
    deleteFavourite
} from "../services/favouriteService.js";

export const addFavourite = async (req, res) => {
    try {
        const favouriteData = req.body;
        const newFavourite = await createFavourite(favouriteData);
        res.status(201).json(newFavourite);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const fetchFavourites = async (req, res) => {
    try {
        const favourites = await getFavourite();
        res.status(200).json(favourites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const fetchFavouriteById = async (req, res) => {
    try {
        const { id } = req.params;
        const favourite = await getFavouriteById(id);
        if (!favourite) {
            return res.status(404).json({ error: "Favourite not found" });
        }
        res.status(200).json(favourite);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const modifyFavourite = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedFavourite = await updateFavourite(id, updates);
        if (!updatedFavourite || updatedFavourite.length === 0) {
            return res.status(404).json({ error: "Favourite not found" });
        }
        res.status(200).json(updatedFavourite);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const removeFavourite = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await deleteFavourite(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



