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


export const getPackageCategoriesByRestaurant = async (restaurant_id) => {
const { data: categories, error } = await supabase
    .from("package_categories")
    .select(`
      id,
      name,
      packages (
        id,
        name,
        discount,
        package_details (
          id,
          name,
          description,
          price
        ),
        package_images (
          id,
          url,
          filename
        )
      )
    `)
    .eq("restaurant_id", restaurant_id);

  if (error) throw new Error(error.message);

  // --- apply discount logic (ignore start/end date) --- //
  const populatedCategories = (categories ?? []).map((category) => ({
    ...category,
    packages: (category.packages ?? []).map((pkg) => {
      const hasDiscount = pkg.discount && pkg.discount > 0;

      const packageDetails = (pkg.package_details ?? []).map((detail) => {
        if (hasDiscount) {
          const discountedPrice = detail.price * (1 - pkg.discount / 100);
          return {
            ...detail,
            old_price: detail.price,
            price: Number(discountedPrice.toFixed(2)),
            has_discount: true,
          };
        }
        return {
          ...detail,
          old_price: null,
          has_discount: false,
        };
      });

      return {
        ...pkg,
        package_details: packageDetails,
        package_images: pkg.package_images ?? [],
      };
    }),
  }));

  return populatedCategories;
};