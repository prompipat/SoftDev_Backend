import supabase from "../config/supabaseClient.js";

// --- CRUD --- //
export const createRestaurant = async (restaurantData) => {
  const existing = await findRestaurantByName(restaurantData.name);
  if (existing) throw new Error("Restaurant already exists");

  const { data, error } = await supabase
    .from("restaurants")
    .insert([{
      name: restaurantData.name,
      description: restaurantData.description,
      user_id: restaurantData.user_id,
      tax_id: restaurantData.tax_id,
      sub_location: restaurantData.sub_location,
      location: restaurantData.location,
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getRestaurants = async () => {
  const { data, error } = await supabase
    .from("restaurants")
    .select(`
      *,
      restaurant_main_category_map!inner(
        main_category_id,
        main_category:restaurant_main_category(id, name)
      ),
      restaurant_food_category_map!inner(
        food_category_id,
        food_category:restaurant_food_categories(id, name)
      ),
      restaurant_event_category_map!inner(
        event_category_id,
        event_category:restaurant_event_categories(id, name)
      )
    `);

  if (error) throw new Error(error.message);
  return data;
};

export const getRestaurantById = async (id) => {
  const { data, error } = await supabase
    .from("restaurants")
    .select(`
      *,
      restaurant_main_category_map!inner(
        main_category_id,
        main_category:restaurant_main_category(id, name)
      ),
      restaurant_food_category_map!inner(
        food_category_id,
        food_category:restaurant_food_categories(id, name)
      ),
      restaurant_event_category_map!inner(
        event_category_id,
        event_category:restaurant_event_categories(id, name)
      )
    `)
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
  if (!existing) throw new Error("Restaurant not found");

  const { error } = await supabase.from("restaurants").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { success: true, message: "Restaurant deleted successfully" };
};

export const findRestaurantByName = async (name) => {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("name", name)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
};

// --- SEARCH & FILTER --- //
export const searchRestaurants = async (query, filters = {}, page = 1, limit = 10) => {
  try {
    let builder = supabase
      .from("restaurants")
      .select(`
        *,
        restaurant_main_category_map!inner(
          main_category_id,
          main_category:restaurant_main_category(id, name)
        ),
        restaurant_food_category_map!inner(
          food_category_id,
          food_category:restaurant_food_categories(id, name)
        ),
        restaurant_event_category_map!inner(
          event_category_id,
          event_category:restaurant_event_categories(id, name)
        )
      `)
      .ilike("name", `%${query}%`);

    // --- Apply filters if provided --- //
    // TODO: Fix Filter !!!
    // if (filters.main_category_id) {
    //   builder = builder.contains("restaurant_main_category_map", [{ main_category_id: filters.main_category_id }]);
    // }
    // if (filters.food_category_id) {
    //   builder = builder.contains("restaurant_food_category_map", [{ food_category_id: filters.food_category_id }]);
    // }
    // if (filters.event_category_id) {
    //   builder = builder.contains("restaurant_event_category_map", [{ event_category_id: filters.event_category_id }]);
    // }

    const { data, error } = await builder;
    if (error) throw new Error(error.message);

    // --- pagination --- //
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / limit);
    const offset = (page - 1) * limit;
    const paginatedResults = data.slice(offset, offset + limit);

    return {
      data: paginatedResults,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
