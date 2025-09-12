import supabase from "../config/supabaseClient.js";
import { v4 as uuidv4 } from "uuid";


export const uploadBlogImage = async (blogImageData, file) => {
  try{
   const fileExt = file.originalname.split(".").pop();
   const fileName = `${blogImageData.blog_id}-${uuidv4()}.${fileExt}`;
   const filePath = `blog/${fileName}`;

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
    .from("blog_images")
    .insert([
      {
        url: url,
        blog_id: blogImageData.blog_id,
        filename: fileName,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data
  } catch (err) {
    throw new Error(err.message);
  }
};





export const getBlog_image = async () => {
  const { data, error } = await supabase.from("blog_images").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getBlog_imageById = async (id) => {
  const { data, error } = await supabase
    .from("blog_images")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};



export const updateBlog_image = async (id, updates) => {
  const { data, error } = await supabase
    .from("blog_images")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteBlog_image = async (id) => {
  const existing = await getBlog_imageById(id);
  if (!existing) throw new Error("Blog image not found");
  const { error: storageError } = await supabase.storage
    .from("images")
    .remove([`blog/${existing.filename}`]);

  if (storageError) throw new Error(storageError.message);


  const { error } = await supabase
    .from("blog_images")
    .delete()
    .eq("id", id)

  if (error) throw new Error(error.message);
  return { success: true, message: "blogs image deleted successfully" };
};


