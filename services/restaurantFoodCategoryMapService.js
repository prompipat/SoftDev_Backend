// restaurantFoodCategoryMapService.js
import supabase from "../config/supabaseClient.js";

export const createRestaurantFoodCategoryMap = async (mapData) => {
  // prevent duplicate restaurant_id + food_category_id
  const existing = await findRestaurantFoodCategoryMap(
    mapData.restaurant_id,
    mapData.food_category_id
  );
  if (existing) {
    throw new Error("This mapping already exists");
  }

  const { data, error } = await supabase
    .from("restaurant_food_category_map")
    .insert([mapData])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getAllRestaurantFoodCategoryMaps = async () => {
  const { data, error } = await supabase
    .from("restaurant_food_category_map")
    .select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getRestaurantFoodCategoryMapById = async (id) => {
  const { data, error } = await supabase
    .from("restaurant_food_category_map")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};

export const updateRestaurantFoodCategoryMap = async (id, updates) => {
  if (updates.restaurant_id && updates.food_category_id) {
    const existing = await findRestaurantFoodCategoryMap(
      updates.restaurant_id,
      updates.food_category_id
    );
    if (existing && existing.id !== id) {
      throw new Error("This mapping already exists");
    }
  }

  const { data, error } = await supabase
    .from("restaurant_food_category_map")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteRestaurantFoodCategoryMap = async (id) => {
  const existing = await getRestaurantFoodCategoryMapById(id);
  if (!existing) {
    throw new Error("Mapping not found");
  }

  const { error } = await supabase
    .from("restaurant_food_category_map")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true, message: "Mapping deleted successfully" };
};

export const findRestaurantFoodCategoryMap = async (restaurant_id, food_category_id) => {
  const { data, error } = await supabase
    .from("restaurant_food_category_map")
    .select("*")
    .eq("restaurant_id", restaurant_id)
    .eq("food_category_id", food_category_id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};
