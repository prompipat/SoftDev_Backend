import supabase from "../config/supabaseClient.js";

export const createRestaurantImage = async (restaurantImageData) => {
  const { data, error } = await supabase
    .from("restaurants_images")
    .insert([
      {
        url: restaurantImageData.url,
        restaurant_id: restaurantImageData.restaurant_id,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getRestaurantImages = async () => {
  const { data, error } = await supabase.from("restaurants_images").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getRestaurantImageById = async (id) => {
  const { data, error } = await supabase
    .from("restaurants_images")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};

export const updateRestaurantImage = async (id, updates) => {
  const { data, error } = await supabase
    .from("restaurants_images")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteRestaurantImage = async (id) => {
  const existing = await getRestaurantImageById(id);
  if (!existing) {
    throw new Error("Restaurant image not found");
  }

  const { error } = await supabase
    .from("restaurants_images")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true, message: "Restaurant image deleted successfully" };
};
