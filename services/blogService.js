import supabase from "../config/supabaseClient.js";

export const createBlog = async (blogData) => {
  const { data, error } = await supabase
    .from("blogs")
    .insert([blogData])
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const getBlog = async () => {
  const { data, error } = await supabase.from("blogs").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getBlogById = async (id) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};



export const updateBlog = async (id, updates) => {
  const { data, error } = await supabase
    .from("blogs")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteBlog = async (id) => {
  const { error } = await supabase
    .from("blogs")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return { success: true, message: "blogs deleted successfully" };
};

