// restaurantFoodCategoryService.js
import supabase from "../config/supabaseClient.js";

export const createFoodCategory = async (categoryData) => {
  const existing = await findFoodCategoryByName(categoryData.name);
  if (existing) {
    throw new Error("Food category already exists");
  }

  const { data, error } = await supabase
    .from("restaurant_food_categories")
    .insert([{ name: categoryData.name }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getFoodCategories = async () => {
  const { data, error } = await supabase
    .from("restaurant_food_categories")
    .select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getFoodCategoryById = async (id) => {
  const { data, error } = await supabase
    .from("restaurant_food_categories")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};

export const updateFoodCategory = async (id, updates) => {
  if (updates.name) {
    const existing = await findFoodCategoryByName(updates.name);
    if (existing && existing.id !== id) {
      throw new Error("Food category name must be unique");
    }
  }

  const { data, error } = await supabase
    .from("restaurant_food_categories")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteFoodCategory = async (id) => {
  const existing = await getFoodCategoryById(id);
  if (!existing) {
    throw new Error("Food category not found");
  }

  const { error } = await supabase
    .from("restaurant_food_categories")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true, message: "Food category deleted successfully" };
};

export const findFoodCategoryByName = async (name) => {
  const { data, error } = await supabase
    .from("restaurant_food_categories")
    .select("*")
    .eq("name", name)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};
