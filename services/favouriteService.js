import supabase from "../config/supabaseClient.js";

export const createFavourite = async (favouriteData) => {
    const { data, error } = await supabase
        .from("favourites")
        .insert([favouriteData])
        .select();
    
    if (error) throw new Error(error.message);
    return data;
};

export const getFavourite = async () => {
    const { data, error } = await supabase.from("favourites").select("*");
    
    if (error) throw new Error(error.message);
    return data;
};

export const getFavouriteById = async (id) => {
    const { data, error } = await supabase
        .from("favourites")
        .select("*")
        .eq("id", id)
        .single();
    
    if (error) throw new Error(error.message);
    return data;
};

export const updateFavourite = async (id, updates) => {
    const { data, error } = await supabase
        .from("favourites")
        .update(updates)
        .eq("id", id)
        .select();
    
    if (error) throw new Error(error.message);
    return data;
};

export const deleteFavourite = async (id) => {
    const { error } = await supabase
        .from("favourites")
        .delete()
        .eq("id", id)
        .select();
    
    if (error) throw new Error(error.message);
    return { success: true, message: "Favourite deleted successfully" };
};

