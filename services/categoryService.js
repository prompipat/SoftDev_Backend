import supabase from "../config/supabaseClient.js";

export const createCategory = async (categoryData) => {

  const existing = await findCategoryByName(categoryData.name);
  if (existing) {
    throw new Error("Category already exists");
  }

  const { data, error } = await supabase
    .from("categories")
    .insert([{ name: categoryData.name }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getCategories = async () => {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getCategoryById = async (id) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};


export const updateCategory = async (id, updates) => {
  const { data, error } = await supabase
    .from("categories")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteCategory = async (id) => {
  const existing = await getCategoryById(id);
  if (!existing) {
    throw new Error("Category not found");
  }

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true, message: "Category deleted successfully" };
};

export const findCategoryByName = async (name) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("name", name)
    .maybeSingle(); // returns null if not found

  if (error) throw new Error(error.message);
  return data;
};