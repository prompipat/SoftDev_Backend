import supabase from "../config/supabaseClient.js";

export const createReview = async (reviewData) => {
  const { data, error } = await supabase
    .from("reviews")
    .insert([reviewData])
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

