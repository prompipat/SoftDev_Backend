// restaurantMainCategoryMapService.js
import supabase from "../config/supabaseClient.js";

export const createRestaurantMainCategoryMap = async (mapData) => {
  // prevent duplicate restaurant_id + main_category_id
  const existing = await findRestaurantMainCategoryMap(
    mapData.restaurant_id,
    mapData.main_category_id
  );
  if (existing) {
    throw new Error("This mapping already exists");
  }

  const { data, error } = await supabase
    .from("restaurant_main_category_map")
    .insert([mapData])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getAllRestaurantMainCategoryMaps = async () => {
  const { data, error } = await supabase
    .from("restaurant_main_category_map")
    .select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getRestaurantMainCategoryMapById = async (id) => {
  const { data, error } = await supabase
    .from("restaurant_main_category_map")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};

export const updateRestaurantMainCategoryMap = async (id, updates) => {
  if (updates.restaurant_id && updates.main_category_id) {
    const existing = await findRestaurantMainCategoryMap(
      updates.restaurant_id,
      updates.main_category_id
    );
    if (existing && existing.id !== id) {
      throw new Error("This mapping already exists");
    }
  }

  const { data, error } = await supabase
    .from("restaurant_main_category_map")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteRestaurantMainCategoryMap = async (id) => {
  const existing = await getRestaurantMainCategoryMapById(id);
  if (!existing) {
    throw new Error("Mapping not found");
  }

  const { error } = await supabase
    .from("restaurant_main_category_map")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true, message: "Mapping deleted successfully" };
};

export const findRestaurantMainCategoryMap = async (restaurant_id, main_category_id) => {
  const { data, error } = await supabase
    .from("restaurant_main_category_map")
    .select("*")
    .eq("restaurant_id", restaurant_id)
    .eq("main_category_id", main_category_id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};
