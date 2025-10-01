import supabase from "../config/supabaseClient.js";

export const createPackageCategory = async (categoryData) => {
    const {data ,error} = await supabase
    .from("package_categories")
    .insert([categoryData])
    .select()

    if (error) throw new Error(error.message);
    return data;
}
    

export const getPackageCategories = async () => {
    const {data ,error} = await supabase
    .from("package_categories")
    .select("*")

    if (error) throw new Error(error.message);
    return data;
}

export const getPackageCategoryById = async (id) => {
    const {data ,error} = await supabase
    .from("package_categories")
    .select("*")
    .eq("id", id)
    .maybeSingle()
    if (error) throw new Error(error.message);
    return data;
}

export const updatePackageCategory = async (id, updates) => {
    const {data ,error} = await supabase
    .from("package_categories")
    .update(updates)
    .eq("id", id)
    .select()
    .single()
    if (error) throw new Error(error.message);
    return data;
}

export const deletePackageCategory = async (id) => {
    const existing = await getPackageCategoryById(id);
    if (!existing) {
        throw new Error("Package Category not found");
    }
    const {error} = await supabase
    .from("package_categories")
    .delete()
    .eq("id", id)
    .select()
    if (error) throw new Error(error.message);
    return { success: true, message: "Package Category deleted successfully" };
};


export const getPackageCategoriesByRestaurant = async (restaurantId) => {
  const { data, error } = await supabase
    .from("package_categories")
    .select(`
      id,
      name,
      packages (
        id,
        name,
        description,
        discount,
        start_discount_date,
        end_discount_date
      )
    `)
    .eq("restaurant_id", restaurantId);

  if (error) throw new Error(error.message);
  return data;
};