import supabase from "../config/supabaseClient.js";

export const createOrder = async (orderData) => {

  const { data: packageDetail, error: packageError } = await supabase
    .from("package_details")
    .select("price")
    .eq("id", orderData.package_detail_id)
    .single();

  if (packageError) throw new Error(packageError.message);
  if (!packageDetail) throw new Error("Package detail not found");

  
  orderData.status = orderData.status || 'pending';
  orderData.unit_price = packageDetail.price;
  orderData.total_price = orderData.unit_price * orderData.participants;



  const { data, error } = await supabase
    .from("orders")
    .insert([orderData])
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const getOrder = async () => {
  const { data, error } = await supabase.from("orders").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getOrderById = async (id) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};



export const updateOrder = async (id, updates) => {
  const { data, error } = await supabase
    .from("orders")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteOrder = async (id) => {
  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return { success: true, message: "Order deleted successfully" };
};



export const updateOrderStatus = async (id, updates) => {
  const { data, error } = await supabase
    .from("orders")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getOrdersByUserId = async (userId) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return data;
};