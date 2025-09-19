import{
    createReview
    , getReview
    , getReviewById   
    , updateReview
    , deleteReview
} from "../services/reviewService.js";

export const addReview = async (req, res) => {
    try {
        const reviewData = req.body;
        const userId = req.user.userData.id;
        
        reviewData.user_id = userId;
        const newReview = await createReview(reviewData);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const fetchReviews = async (req, res) => {
    try {
        const reviews = await getReview();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const fetchReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await getReviewById(id);
        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const modifyReview = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedReview = await updateReview(id, updates);
        if (!updatedReview || updatedReview.length === 0) {
            return res.status(404).json({ error: "Review not found" });
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const removeReview = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await deleteReview(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}