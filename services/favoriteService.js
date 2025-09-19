import supabase from "../config/supabaseClient.js";

export const createFavorite = async (favoriteData) => {
  const { data, error } = await supabase
    .from("favorites")
    .insert([favoriteData])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getFavorites = async () => {
  const { data, error } = await supabase
    .from("favorites")
    .select(`
      id,
      restaurant_id,
      restaurants (
        id,
        name,
        description,
        categories (
          id,
          name
        ),
        restaurants_images (
          id,
          url,
          filename
        )
      )
    `);

  if (error) throw new Error(error.message);
  return data;
};

export const getFavoriteById = async (id) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};

export const updateFavorite = async (id, updates) => {
  const { data, error } = await supabase
    .from("favorites")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteFavorite = async (id) => {
  const { error } = await supabase.from("favorites").delete().eq("id", id);

  if (error) throw new Error(error.message);
  return { message: "Favorite deleted successfully" };
};

export const getFavoritesByUser = async (userId) => {
  const { data, error } = await supabase
    .from("favorites")
    .select(`
      id,
      restaurant_id,
      restaurants (
        id,
        name,
        description,
        categories (
          id,
          name
        ),
        restaurants_images (
          id,
          url,
          filename
        )
      )
    `)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return data;
};
