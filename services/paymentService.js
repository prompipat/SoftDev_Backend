import supabase from "../config/supabaseClient.js";

export const createPayment = async (paymentData) => {
  const { data, error } = await supabase
    .from("payments")
    .insert([paymentData])
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const getPayment = async () => {
  const { data, error } = await supabase.from("payments").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getPaymentById = async (id) => {
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};  

export const updatePayment = async (id, updates) => {
  const { data, error } = await supabase
    .from("payments")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const deletePayment = async (id) => {
  const { error } = await supabase
    .from("payments")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return { success: true, message: "Payment deleted successfully" };
};



