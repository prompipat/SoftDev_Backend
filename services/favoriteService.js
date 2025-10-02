import supabase from "../config/supabaseClient.js";

export const createFavorite = async (favoriteData) => {
  // --- Check if this favorite already exists ---
  const { data: existing, error: existingError } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", favoriteData.user_id)
    .eq("restaurant_id", favoriteData.restaurant_id)
    .maybeSingle();

  if (existingError) throw new Error(existingError.message);
  if (existing) throw new Error("You already favorited this restaurant");

  // --- Insert new favorite ---
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
        restaurants_images (
          id,
          url,
          filename
        ),
        restaurant_main_category_map (
          main_category:restaurant_main_category (
            id,
            name
          )
        ),
        restaurant_food_category_map (
          food_category:restaurant_food_categories (
            id,
            name
          )
        ),
        restaurant_event_category_map (
          event_category:restaurant_event_categories (
            id,
            name
          )
        )
      )
    `);

  if (error) throw new Error(error.message);
  return data;
};

export const getFavoriteById = async (id) => {
  const { data, error } = await supabase
    .from("favorites")
    .select(`
      id,
      restaurant_id,
      restaurants (
        id,
        name,
        description,
        restaurants_images (
          id,
          url,
          filename
        ),
        restaurant_main_category_map (
          main_category:restaurant_main_category (
            id,
            name
          )
        ),
        restaurant_food_category_map (
          food_category:restaurant_food_categories (
            id,
            name
          )
        ),
        restaurant_event_category_map (
          event_category:restaurant_event_categories (
            id,
            name
          )
        )
      )
    `)
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
        restaurants_images (
          id,
          url,
          filename
        ),
        restaurant_main_category_map (
          main_category:restaurant_main_category (
            id,
            name
          )
        ),
        restaurant_food_category_map (
          food_category:restaurant_food_categories (
            id,
            name
          )
        ),
        restaurant_event_category_map (
          event_category:restaurant_event_categories (
            id,
            name
          )
        )
      )
    `)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return data;
};
