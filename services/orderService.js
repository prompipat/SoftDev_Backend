import supabase from "../config/supabaseClient.js";


export const createOrder = async (orderData) => {
  try {
    // 1. Fetch package detail (base price + package info)
    const { data: packageDetail, error: detailError } = await supabase
      .from("package_details")
      .select(`
        id,
        price,
        package:package_id (
          id,
          discount,
          start_discount_date,
          end_discount_date
        )
      `)
      .eq("id", orderData.package_detail_id)
      .single();

    if (detailError) throw new Error(detailError.message);
    if (!packageDetail) throw new Error("Package detail not found");

    let finalUnitPrice = packageDetail.price;

  
   
    
    // 2. apply discount
    const pkg = packageDetail.package;
    finalUnitPrice =  finalUnitPrice - (finalUnitPrice * pkg.discount) / 100;
      

    // 3. Assign calculated values
    orderData.unit_price = finalUnitPrice;
    orderData.total_price = finalUnitPrice * orderData.participants;
    orderData.status = orderData.status || "pending";

    // 4. Insert order
    const { data, error } = await supabase
      .from("orders")
      .insert([orderData])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
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


export const getOrdersByUserId = async (userId, status = "all") => {
  let query = supabase.from("orders").select("*").eq("user_id", userId);

  // Apply status filter if not "all"
  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
};