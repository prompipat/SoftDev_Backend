import supabase from "../config/supabaseClient.js";
import { v4 as uuidv4 } from "uuid";

export const uploadRestaurantImage = async (restaurantImageData, file) => {
  try {
    const fileExt = file.originalname.split(".").pop();
    const fileName = `${restaurantImageData.restaurant_id}-${uuidv4()}.${fileExt}`;
    const filePath = `restaurant/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file.buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.mimetype,
      });

    if (uploadError) throw new Error(uploadError.message);

    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    const url = publicUrlData.publicUrl;

    // Insert into DB
    const { data, error } = await supabase
      .from("restaurants_images")
      .insert([
        {
          url: url,
          restaurant_id: restaurantImageData.restaurant_id,
          filename: fileName,
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getRestaurantImages = async () => {
  const { data, error } = await supabase.from("restaurants_images").select("*");
  if (error) throw new Error(error.message);
  return data;
};

export const getRestaurantImageById = async (id) => {
  const { data, error } = await supabase
    .from("restaurants_images")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
};

export const updateRestaurantImage = async (id, updates) => {
  const { data, error } = await supabase
    .from("restaurants_images")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const deleteRestaurantImage = async (id) => {
  const existing = await getRestaurantImageById(id);
  if (!existing) throw new Error("Restaurant image not found");

  const { error: storageError } = await supabase.storage
    .from("images")
    .remove([`restaurant/${existing.filename}`]);

  if (storageError) throw new Error(storageError.message);

  const { error } = await supabase
    .from("restaurants_images")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true, message: "Restaurant image deleted successfully" };
};
