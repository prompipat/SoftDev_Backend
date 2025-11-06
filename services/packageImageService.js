import supabase from "../config/supabaseClient.js";
import { v4 as uuidv4 } from "uuid";

export const createPackageImage = async (file, package_id) => {
  if (!file) throw new Error("No file uploaded");

  const filename = `package/${uuidv4()}-${file.originalname}`;


  const { error: uploadError } = await supabase.storage
    .from("images") // bucket name
    .upload(filename, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (uploadError) throw new Error(uploadError.message);


  const {
    data: { publicUrl },
  } = supabase.storage.from("images").getPublicUrl(filename);


  const { data, error } = await supabase
    .from("package_images")
    .insert([
      {
        url: publicUrl,
        filename: filename,
        package_id,
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
