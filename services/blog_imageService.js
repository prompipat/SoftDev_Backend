import supabase from "../config/supabaseClient.js";

export const createBlog_image = async (blog_imageData) => {
  const { data, error } = await supabase
    .from("blog_images")
    .insert([blog_imageData])
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const getBlog_image = async () => {
  const { data, error } = await supabase.from("blog_images").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getBlog_imageById = async (id) => {
  const { data, error } = await supabase
    .from("blog_images")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};



export const updateBlog_image = async (id, updates) => {
  const { data, error } = await supabase
    .from("blog_images")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteBlog_image = async (id) => {
  const { error } = await supabase
    .from("blog_images")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return { success: true, message: "blogs image deleted successfully" };
};

