// restaurantMainCategory.js
import supabase from "../config/supabaseClient.js";

export const createMainCategory = async (categoryData) => {
  const existing = await findMainCategoryByName(categoryData.name);
  if (existing) {
    throw new Error("Main category already exists");
  }

  const { data, error } = await supabase
    .from("restaurant_main_category")
    .insert([{ name: categoryData.name }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getMainCategories = async () => {
  const { data, error } = await supabase
    .from("restaurant_main_category")
    .select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getMainCategoryById = async (id) => {
  const { data, error } = await supabase
    .from("restaurant_main_category")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};

export const updateMainCategory = async (id, updates) => {
  if (updates.name) {
    const existing = await findMainCategoryByName(updates.name);
    if (existing && existing.id !== id) {
      throw new Error("Main category name must be unique");
    }
  }

  const { data, error } = await supabase
    .from("restaurant_main_category")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteMainCategory = async (id) => {
  const existing = await getMainCategoryById(id);
  if (!existing) {
    throw new Error("Main category not found");
  }

  const { error } = await supabase
    .from("restaurant_main_category")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true, message: "Main category deleted successfully" };
};

export const findMainCategoryByName = async (name) => {
  const { data, error } = await supabase
    .from("restaurant_main_category")
    .select("*")
    .eq("name", name)
    .maybeSingle(); // returns null if not found

  if (error) throw new Error(error.message);
  return data;
};
