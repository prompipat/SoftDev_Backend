import supabase from "../config/supabaseClient.js";

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
export const getRestaurants = async (page = 1, limit = 10) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from("restaurants")
    .select(`
      id, name, description,
      restaurants_images ( id, url, filename ),
      restaurant_food_category_map (
        food_category:restaurant_food_categories ( id, name )
      ),
      restaurant_event_category_map (
        event_category:restaurant_event_categories ( id, name )
      ),
      restaurant_main_category_map (
        main_category:restaurant_main_category ( id, name )
      ),
      reviews (id, review_info, rating)
    `)
    .range(from, to);

  if (error) throw error;

  const restaurants = (data ?? []).map(r => {
    const reviews = r.reviews;
    const ratings = reviews.map(rv => rv.rating).filter(r => typeof r === "number");
    const totalReview = ratings.length;
    const avgRating = totalReview > 0
      ? ratings.reduce((sum, val) => sum + val, 0) / totalReview
      : null;

    return {
      id: r.id,
      name: r.name,
      description: r.description,
      images: (r.restaurants_images ?? []).map(img => ({
        id: img.id,
        url: img.url,
        filename: img.filename
      })),
      foodCategories: (r.restaurant_food_category_map ?? []).map(fc => fc.food_category),
      eventCategories: (r.restaurant_event_category_map ?? []).map(ec => ec.event_category),
      mainCategories: (r.restaurant_main_category_map ?? []).map(mc => mc.main_category),
      avgRating,
      reviews,
      totalReview
    };
  });

  return restaurants;
};

export const getRestaurantById = async (id) => {
  const { data, error } = await supabase
    .from("restaurants")
    .select(`
      id, name, description,
      restaurants_images ( id, url, filename ),
      restaurant_food_category_map (
        food_category:restaurant_food_categories ( id, name )
      ),
      restaurant_event_category_map (
        event_category:restaurant_event_categories ( id, name )
      ),
      restaurant_main_category_map (
        main_category:restaurant_main_category ( id, name )
      ),
      reviews ( id, review_info, rating )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!data) return null;

  const reviews = data.reviews ?? [];
  const ratings = reviews.map(rv => rv.rating).filter(r => typeof r === "number");
  const totalReview = ratings.length;
  const avgRating =
    totalReview > 0
      ? ratings.reduce((sum, val) => sum + val, 0) / totalReview
      : null;

  const restaurant = {
    id: data.id,
    name: data.name,
    description: data.description,
    images: (data.restaurants_images ?? []).map(img => ({
      id: img.id,
      url: img.url,
      filename: img.filename
    })),
    food_categories: (data.restaurant_food_category_map ?? []).map(fc => fc.food_category),
    event_categories: (data.restaurant_event_category_map ?? []).map(ec => ec.event_category),
    main_categories: (data.restaurant_main_category_map ?? []).map(mc => mc.main_category),
    reviews,
    avgRating,
    totalReview,
  };

  return restaurant;
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
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // --- Base query: search in name OR description ---
    let baseBuilder = supabase
      .from("restaurants")
      .select(`
        id, name, description,
        restaurants_images ( id, url, filename ),
        restaurant_main_category_map (
          main_category:restaurant_main_category ( id, name )
        ),
        restaurant_food_category_map (
          food_category:restaurant_food_categories ( id, name )
        ),
        restaurant_event_category_map (
          event_category:restaurant_event_categories ( id, name )
        ),
        reviews ( id, review_info, rating )
      `, { count: "exact" })
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`);

    // --- Apply filters if provided --- //
    if (filters.main_category_id) {
      const { data: mainMatches, error: mainError } = await supabase
        .from("restaurant_main_category_map")
        .select("restaurant_id")
        .eq("main_category_id", filters.main_category_id);

      if (mainError) throw new Error(mainError.message);
      const ids = mainMatches.map(r => r.restaurant_id);
      if (ids.length > 0) {
        baseBuilder = baseBuilder.in("id", ids);
      } else {
        return emptyResult(page, limit);
      }
    }

    if (filters.food_category_id) {
      const { data: foodMatches, error: foodError } = await supabase
        .from("restaurant_food_category_map")
        .select("restaurant_id")
        .eq("food_category_id", filters.food_category_id);

      if (foodError) throw new Error(foodError.message);
      const ids = foodMatches.map(r => r.restaurant_id);
      if (ids.length > 0) {
        baseBuilder = baseBuilder.in("id", ids);
      } else {
        return emptyResult(page, limit);
      }
    }

    if (filters.event_category_id) {
      const { data: eventMatches, error: eventError } = await supabase
        .from("restaurant_event_category_map")
        .select("restaurant_id")
        .eq("event_category_id", filters.event_category_id);

      if (eventError) throw new Error(eventError.message);
      const ids = eventMatches.map(r => r.restaurant_id);
      if (ids.length > 0) {
        baseBuilder = baseBuilder.in("id", ids);
      } else {
        return emptyResult(page, limit);
      }
    }

    // --- Apply pagination ---
    const { data, error, count } = await baseBuilder.range(from, to);
    if (error) throw new Error(error.message);

    // --- Normalize result with reviews ---
    const restaurants = (data ?? []).map(r => {
      const reviews = r.reviews ?? [];
      const ratings = reviews.map(rv => rv.rating).filter(r => typeof r === "number");
      const totalReview = ratings.length;
      const avgRating =
        totalReview > 0
          ? ratings.reduce((sum, val) => sum + val, 0) / totalReview
          : null;

      return {
        id: r.id,
        name: r.name,
        description: r.description,
        images: (r.restaurants_images ?? []).map(img => ({
          id: img.id,
          url: img.url,
          filename: img.filename,
        })),
        food_categories: (r.restaurant_food_category_map ?? []).map(fc => fc.food_category),
        event_categories: (r.restaurant_event_category_map ?? []).map(ec => ec.event_category),
        main_categories: (r.restaurant_main_category_map ?? []).map(mc => mc.main_category),
        reviews,
        avgRating,
        totalReview,
      };
    });

    return {
      data: restaurants,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil((count ?? 0) / limit),
        totalItems: count ?? 0,
        itemsPerPage: limit,
        hasNextPage: page * limit < (count ?? 0),
        hasPreviousPage: page > 1,
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

// --- Helper for empty results ---
const emptyResult = (page, limit) => ({
  data: [],
  pagination: {
    currentPage: page,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: limit,
    hasNextPage: false,
    hasPreviousPage: false,
  },
});