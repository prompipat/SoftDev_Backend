import supabase from "../config/supabaseClient.js";

export const createPackage = async (packageData) => {
  const existing = await findPackageByName(packageData.restaurant_id, packageData.name);
  if (existing) throw new Error("Package already exists for this restaurant");

  const { data, error } = await supabase
    .from("packages")
    .insert([{
      restaurant_id: packageData.restaurant_id,
      name: packageData.name,
      description: packageData.description,
      category_id: packageData.category_id,
      discount: packageData.discount ?? null,
      start_discount_date: packageData.start_discount_date ?? null,
      end_discount_date: packageData.end_discount_date ?? null
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getPackages = async () => {
  const { data, error } = await supabase
    .from("packages")
    .select(`
      *,
      package_details ( id, name, price, description ),
      package_categories ( id, name )
    `);

  if (error) throw new Error(error.message);

  return data.map(pkg => {
    const hasDiscount = pkg.discount && pkg.discount > 0;
    return {
      ...pkg,
      package_details: (pkg.package_details ?? []).map(detail => ({
        id: detail.id,
        name: detail.name,
        description: detail.description,
        old_price: hasDiscount ? detail.price : null,
        price: hasDiscount
          ? detail.price - (detail.price * (pkg.discount / 100))
          : detail.price,
        has_discount: hasDiscount
      }))
    };
  });
};

export const getPackageById = async (id) => {
  const { data, error } = await supabase
    .from("packages")
    .select(`
      *,
      package_details ( id, name, price, description ),
      package_categories ( id, name )
    `)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;

  const hasDiscount = data.discount && data.discount > 0;

  return {
    ...data,
    package_details: (data.package_details ?? []).map(detail => ({
      id: detail.id,
      name: detail.name,
      description: detail.description,
      old_price: hasDiscount ? detail.price : null,
      price: hasDiscount
        ? detail.price - (detail.price * (data.discount / 100))
        : detail.price,
      has_discount: hasDiscount
    }))
  };
};

export const getPackagesByCategory = async (categoryId, restaurantId) => {
  const { data, error } = await supabase
    .from("packages")
    .select(`
      *,
      package_details ( id, name, price, description ),
      package_categories ( id, name )
    `)
    .eq("category_id", categoryId)
    .eq("restaurant_id", restaurantId);

  if (error) throw new Error(error.message);

  return data.map(pkg => {
    const hasDiscount = pkg.discount && pkg.discount > 0;
    return {
      ...pkg,
      package_details: (pkg.package_details ?? []).map(detail => ({
        id: detail.id,
        name: detail.name,
        description: detail.description,
        old_price: hasDiscount ? detail.price : null,
        price: hasDiscount
          ? detail.price - (detail.price * (pkg.discount / 100))
          : detail.price,
        has_discount: hasDiscount
      }))
    };
  });
};

export const updatePackage = async (id, updates) => {
  const { data, error } = await supabase
    .from("packages")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deletePackage = async (id) => {
  const existing = await getPackageById(id);
  if (!existing) {
    throw new Error("Package not found");
  }

  const { error } = await supabase.from("packages").delete().eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true, message: "Package deleted successfully" };
};

export const findPackageByName = async (restaurantId, name) => {
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .eq("name", name)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};