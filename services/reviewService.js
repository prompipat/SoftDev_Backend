import supabase from "../config/supabaseClient.js";

export const createReview = async (reviewData) => {
  // Set timestamp automatically (Thailand local time)
  const now = new Date();
  const thailandTime = new Date(now.getTime() + 7 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("reviews")
    .insert([
      {
        review_info: reviewData.review_info,
        restaurant_id: reviewData.restaurant_id,
        user_id: reviewData.user_id,
        rating: reviewData.rating,
        timestamp: thailandTime, // auto set
      },
    ])
    .select("*, user:user_id(*)"); // populate user

  if (error) throw new Error(error.message);
  return data;
};

export const getReview = async () => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*, user:user_id(*)"); // populate user

  if (error) throw new Error(error.message);
  return data;
};

export const getReviewById = async (id) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*, user:user_id(*)") // populate user
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const updateReview = async (id, updates) => {
  const { data, error } = await supabase
    .from("reviews")
    .update(updates)
    .eq("id", id)
    .select("*, user:user_id(*)"); // populate user

  if (error) throw new Error(error.message);
  return data;
};

export const deleteReview = async (id) => {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true, message: "Review deleted successfully" };
};

export const getReviewsByRestaurantId = async (restaurantId) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*, user:user_id(*)") // populate user
    .eq("restaurant_id", restaurantId);

  if (error) throw new Error(error.message);
  return data;
};