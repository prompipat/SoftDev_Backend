import supabase from "../config/supabaseClient.js";

export const createReview = async (reviewData) => {
  const { data, error } = await supabase
    .from("reviews")
    .insert([
      {
        review_info: reviewData.review_info,
        restaurant_id: reviewData.restaurant_id,
        user_id: reviewData.user_id,
        rating: reviewData.rating
      }
    ])
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const getReview = async () => {
  const { data, error } = await supabase.from("reviews").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getReviewById = async (id) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
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
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteReview = async (id) => {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return { success: true, message: "review deleted successfully" };
};

