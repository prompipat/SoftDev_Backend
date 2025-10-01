import supabase from "../config/supabaseClient.js";

export const createPackage = async (packageData) => {
  // 1. Check if package name already exists for the same restaurant
  const existing = await findPackageByName(packageData.name, packageData.category_id);
  if (existing) throw new Error("Package already exists");

  // 2. Lookup restaurant_id from package_categories table
  const { data: category, error: categoryError } = await supabase
    .from("package_categories")
    .select("restaurant_id")
    .eq("id", packageData.category_id)
    .single();

  if (categoryError) throw new Error(categoryError.message);
  if (!category) throw new Error("Category not found");

  // 3. Attach restaurant_id automatically
  const insertData = {
    restaurant_id: category.restaurant_id,  // auto from category
    name: packageData.name,
    description: packageData.description,
    category_id: packageData.category_id,
    discount: packageData.discount || null,
    start_discount_date: packageData.start_discount_date || null,
    end_discount_date: packageData.end_discount_date || null,
  };

  // 4. Insert into packages table
  const { data, error } = await supabase
    .from("packages")
    .insert([insertData])
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

export const findPackageByName = async (name, category_id) => {
  // get restaurant_id for that category
  const { data: category } = await supabase
    .from("package_categories")
    .select("restaurant_id")
    .eq("id", category_id)
    .single();

  if (!category) return null;

  // check if package with same name exists under same restaurant
  const { data } = await supabase
    .from("packages")
    .select("*")
    .eq("name", name)
    .eq("restaurant_id", category.restaurant_id)
    .maybeSingle();

  return data;
};

export const getTopPromotions = async () => {
  const { data, error } = await supabase
    .from("packages")
    .select(`
      id,
      name,
      description,
      discount,
      start_discount_date,
      end_discount_date,
      package_images (
        id,
        url,
        package_id
      )
    `)
    .gt("discount", 0) // must have discount > 0
    .order("discount", { ascending: false })
    .limit(5);

  if (error) throw new Error(error.message);


  return (data ?? []).map(pkg => ({
    id: pkg.id,
    name: pkg.name,
    description: pkg.description,
    discount: pkg.discount,
    start_discount_date: pkg.start_discount_date,
    end_discount_date: pkg.end_discount_date,
    images: pkg.package_images ?? []
  }));
};