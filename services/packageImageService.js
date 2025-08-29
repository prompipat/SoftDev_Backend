import supabase from "../config/supabaseClient.js";

export const createPackageImage = async (packageImageData) => {
  const { data, error } = await supabase
    .from("package_images")
    .insert([
      {
        url: packageImageData.url,
        package_id: packageImageData.package_id,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getPackageImages = async () => {
  const { data, error } = await supabase.from("package_images").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getPackageImageById = async (id) => {
  const { data, error } = await supabase
    .from("package_images")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};

export const updatePackageImage = async (id, updates) => {
  const { data, error } = await supabase
    .from("package_images")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deletePackageImage = async (id) => {
  const existing = await getPackageImageById(id);
  if (!existing) {
    throw new Error("Package image not found");
  }

  const { error } = await supabase
    .from("package_images")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true, message: "Package image deleted successfully" };
};
