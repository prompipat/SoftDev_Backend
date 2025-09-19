import supabase from "../config/supabaseClient.js";

export const createRestaurant = async (restaurantData) => {
  const existing = await findRestaurantByName(restaurantData.name);
  if (existing) {
    throw new Error("Restaurant already exists");
  }

  const { data, error } = await supabase
    .from("restaurants")
    .insert([
      {
        name: restaurantData.name,
        description: restaurantData.description,
        user_id: restaurantData.user_id,
        category_id: restaurantData.category_id,
      },
    ])
    .select()
    .single();

  return data;
};

export const getRestaurants = async () => {
  const { data, error } = await supabase.from("restaurants").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getRestaurantById = async (id) => {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};

export const updateRestaurant = async (id, updates) => {
  const { data, error } = await supabase
    .from("restaurants")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteRestaurant = async (id) => {
  const existing = await getRestaurantById(id);
  if (!existing) {
    throw new Error("Restaurant not found");
  }

  const { error } = await supabase.from("restaurants").delete().eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true, message: "Restaurant deleted successfully" };
};

export const findRestaurantByName = async (name) => {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("name", name)
    .maybeSingle(); // returns null if not found

  if (error) throw new Error(error.message);
  return data;
};
