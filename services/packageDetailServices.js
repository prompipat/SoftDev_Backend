import supabase from "../config/supabaseClient.js";

export const createPackageDetail = async (packageDetailData) => {
    const {data ,error} = await supabase
    .from("package_details")
    .insert([packageDetailData])
    .select()
    if (error) throw new Error(error.message);
    return data;
}

export const getPackageDetails = async () => {
    const {data ,error} = await supabase
    .from("package_details")
    .select("*")
    if (error) throw new Error(error.message);
    return data;
}

export const getPackageDetailById = async (id) => {
    const {data ,error} = await supabase
    .from("package_details")
    .select("*")
    .eq("id", id)
    .maybeSingle()
    if (error) throw new Error(error.message);
    return data;
}

export const updatePackageDetail = async (id, updates) => {
    const {data ,error} = await supabase
    .from("package_details")
    .update(updates)
    .eq("id", id)
    .select()
    .single()
    if (error) throw new Error(error.message);
    return data;
}


export const deletePackageDetail = async (id) => {
    const existing = await getPackageDetailById(id);
    if (!existing) {
        throw new Error("Package Detail not found");
    }
    const {error} = await supabase
    .from("package_details")
    .delete()
    .eq("id", id)
    .select()
    if (error) throw new Error(error.message);
    return { success: true, message: "Package Detail deleted successfully" };
}


