import supabase from "../config/supabaseClient.js";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (userData) => {
  const { data, error } = await supabase
    .from("users")
    .insert([userData])
    .select();

  if (error) throw new Error(error.message);
  return data;
};


export const uploadUserProfilePicture = async (userId, file) => {
  try {
    
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("profile_picture")
      .eq("id", userId)
      .single();

    if (fetchError) throw new Error(fetchError.message);

    // Delete old file from storage if exists
    if (existingUser?.profile_picture) {
      const parts = existingUser.profile_picture.split("/");
      const oldFileName = parts[parts.length - 1];
      const oldFilePath = `user/${oldFileName}`;

      await supabase.storage.from("images").remove([oldFilePath]);
    }

  
    const fileExt = file.originalname.split(".").pop();
    const fileName = `${userId}-${uuidv4()}.${fileExt}`;
    const filePath = `user/${fileName}`;

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

    const profileUrl = publicUrlData.publicUrl;

    const { data, error } = await supabase
      .from("users")
      .update({ profile_picture: profileUrl })
      .eq("id", userId)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};


export const getUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getUserById = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") throw new Error(error.message);
  return data;
};

export const updateUser = async (id, updates) => {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteUser = async (id) => {
  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true, message: "User deleted successfully" };
};

export const searchUsers = async (query) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .ilike("name", `%${query}%`);

  if (error) throw new Error(error.message);
  return data;
};
