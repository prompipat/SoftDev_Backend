import supabase from "../config/supabaseClient.js";

export const createBlog = async (blogData) => {
  const { data, error } = await supabase
    .from("blogs")
    .insert([
      {
        timestamp: blogData.timestamp,
        title: blogData.title,
        detail: blogData.detail,
        user_id: blogData.user_id
      }
    ])
    .select("*, user:user_id(*)");

  if (error) throw new Error(error.message);
  return data;
};

export const getBlog = async (page = 1, limit = 10, sortBy = 'timestamp', sortOrder = 'desc') => {
  const offset = (page - 1) * limit;

  const { count, error: countError } = await supabase
    .from("blogs")
    .select("*", { count: 'exact', head: true });

  if (countError) throw new Error(countError.message);

  const { data, error } = await supabase
    .from("blogs")
    .select("*, user:user_id(*)")
    .order(sortBy, { ascending: sortOrder === 'asc' })
    .range(offset, offset + limit - 1);

  if (error) throw new Error(error.message);

  const totalPages = Math.ceil(count / limit);

  return {
    data,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: count,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    }
  };
};

export const getBlogById = async (id) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*, user:user_id(*)")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const updateBlog = async (id, updates) => {
  const { data, error } = await supabase
    .from("blogs")
    .update(updates)
    .eq("id", id)
    .select("*, user:user_id(*)");

  if (error) throw new Error(error.message);
  return data;
};

export const deleteBlog = async (id) => {
  const { error } = await supabase
    .from("blogs")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return { success: true, message: "blogs deleted successfully" };
};