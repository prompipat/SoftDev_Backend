import supabase from "../config/supabaseClient.js";

export const createPackage = async (packageData) => {
  const existing = await findPackageByName(packageData.name);
  if (existing) {
    throw new Error("Package already exists");
  }

  const { data, error } = await supabase
    .from("packages")
    .insert([
      {
        restaurant_id: packageData.restaurant_id,
        name: packageData.name,
        price: packageData.price,
        description: packageData.description,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getPackages = async () => {
  const { data, error } = await supabase.from("packages").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getPackageById = async (id) => {
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
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

export const findPackageByName = async (name) => {
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("name", name)
    .maybeSingle(); // returns null if not found

  if (error) throw new Error(error.message);
  return data;
};
