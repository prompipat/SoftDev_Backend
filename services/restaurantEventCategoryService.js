// restaurantEventCategory.js
import supabase from "../config/supabaseClient.js";

export const createEventCategory = async (categoryData) => {
  const existing = await findEventCategoryByName(categoryData.name);
  if (existing) {
    throw new Error("Event category already exists");
  }

  const { data, error } = await supabase
    .from("restaurant_event_categories")
    .insert([{ name: categoryData.name }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getEventCategories = async () => {
  const { data, error } = await supabase
    .from("restaurant_event_categories")
    .select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getEventCategoryById = async (id) => {
  const { data, error } = await supabase
    .from("restaurant_event_categories")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};

export const updateEventCategory = async (id, updates) => {
  if (updates.name) {
    const existing = await findEventCategoryByName(updates.name);
    if (existing && existing.id !== id) {
      throw new Error("Event category name must be unique");
    }
  }

  const { data, error } = await supabase
    .from("restaurant_event_categories")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteEventCategory = async (id) => {
  const existing = await getEventCategoryById(id);
  if (!existing) {
    throw new Error("Event category not found");
  }

  const { error } = await supabase
    .from("restaurant_event_categories")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true, message: "Event category deleted successfully" };
};

export const findEventCategoryByName = async (name) => {
  const { data, error } = await supabase
    .from("restaurant_event_categories")
    .select("*")
    .eq("name", name)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};
