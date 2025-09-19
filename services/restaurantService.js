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
  if (error) throw new Error(error.message);
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



export const searchRestaurants = async (query, page = 1, limit = 10) => {
  try {
    // search in restaurants 
    const { data: restaurantMatches, error: restaurantError } = await supabase
      .from("restaurants")
      .select(`
        id,
        name,
        description,
        user_id,
        category_id,
        categories (
          id,
          name
        ),
        restaurants_images (
          id,
          url,
          filename
        )
      `)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`);

    if (restaurantError) throw new Error(restaurantError.message);

    // search in categories 
    const { data: categoryMatches, error: categoryError } = await supabase
      .from("categories")
      .select("id, name")
      .ilike("name", `%${query}%`);

    if (categoryError) throw new Error(categoryError.message);

    let categoryRestaurants = [];
    if (categoryMatches?.length > 0) {
      const categoryIds = categoryMatches.map((c) => c.id);

      const { data, error } = await supabase
        .from("restaurants")
        .select(`
          id,
          name,
          description,
          user_id,
          category_id,
          categories (
            id,
            name
          ),
          restaurants_images (
            id,
            url,
            filename
          )
        `)
        .in("category_id", categoryIds);

      if (error) throw new Error(error.message);
      categoryRestaurants = data;
    }

    
    const allResults = [...restaurantMatches, ...categoryRestaurants];
    const uniqueResults = Array.from(
      new Map(allResults.map((r) => [r.id, r])).values()
    );

    // --- pagination ---
    const totalItems = uniqueResults.length;
    const totalPages = Math.ceil(totalItems / limit);
    const offset = (page - 1) * limit;
    const paginatedResults = uniqueResults.slice(offset, offset + limit);

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