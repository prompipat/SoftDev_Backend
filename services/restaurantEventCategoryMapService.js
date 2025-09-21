// restaurantEventCategoryMapService.js
import supabase from "../config/supabaseClient.js";

export const createRestaurantEventCategoryMap = async (mapData) => {
  // prevent duplicate restaurant_id + event_category_id
  const existing = await findRestaurantEventCategoryMap(
    mapData.restaurant_id,
    mapData.event_category_id
  );
  if (existing) {
    throw new Error("This mapping already exists");
  }

  const { data, error } = await supabase
    .from("restaurant_event_category_map")
    .insert([mapData])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getAllRestaurantEventCategoryMaps = async () => {
  const { data, error } = await supabase
    .from("restaurant_event_category_map")
    .select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getRestaurantEventCategoryMapById = async (id) => {
  const { data, error } = await supabase
    .from("restaurant_event_category_map")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};

export const updateRestaurantEventCategoryMap = async (id, updates) => {
  if (updates.restaurant_id && updates.event_category_id) {
    const existing = await findRestaurantEventCategoryMap(
      updates.restaurant_id,
      updates.event_category_id
    );
    if (existing && existing.id !== id) {
      throw new Error("This mapping already exists");
    }
  }

  const { data, error } = await supabase
    .from("restaurant_event_category_map")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteRestaurantEventCategoryMap = async (id) => {
  const existing = await getRestaurantEventCategoryMapById(id);
  if (!existing) {
    throw new Error("Mapping not found");
  }

  const { error } = await supabase
    .from("restaurant_event_category_map")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true, message: "Mapping deleted successfully" };
};

export const findRestaurantEventCategoryMap = async (restaurant_id, event_category_id) => {
  const { data, error } = await supabase
    .from("restaurant_event_category_map")
    .select("*")
    .eq("restaurant_id", restaurant_id)
    .eq("event_category_id", event_category_id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};
