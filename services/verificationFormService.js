import supabase from "../config/supabaseClient.js";

export const createVerificationForm = async (verificationFormData) => {
  const { data, error } = await supabase
    .from("verification_form")
    .insert([
      {
        admin_id: verificationFormData.admin_id,
        restaurant_id: verificationFormData.restaurant_id,
        verification_info: verificationFormData.verification_info,
        status: verificationFormData.status,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getVerificationForms = async () => {
  const { data, error } = await supabase.from("verification_form").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const getVerificationFormById = async (id) => {
  const { data, error } = await supabase
    .from("verification_form")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};

export const updateVerificationForm = async (id, updates) => {
  const { data, error } = await supabase
    .from("verification_form")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const deleteVerificationForm = async (id) => {
  const existing = await getVerificationFormById(id);
  if (!existing) {
    throw new Error("Verification form not found");
  }

  const { error } = await supabase.from("verification_form").delete().eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true, message: "Verification form deleted successfully" };
};
