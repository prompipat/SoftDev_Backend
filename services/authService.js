import supabase from "../config/supabaseClient.js";

export const checkEmailAvailability = async (email) => {
    const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single();

    return !data; 
};

export const signUp = async (email, password, userData) => {
    if (!supabase) {
        return { error: { message: 'Supabase is not configured. Please set up your environment variables.' } };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { error: { message: 'Please enter a valid email address.' } };
    }

    try {
        const isAvailable = await checkEmailAvailability(email);
        if (!isAvailable) {
            return { error: { message: 'Email is already taken. Please choose a different one.' } };
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: undefined,
                data: {
                    full_name: userData.name,
                },
            },
        });

        if (error) {
            return { error };
        }

        if (data.user) {
            const { error: profileError } = await supabase
                .from('users')
                .insert({
                    id: data.user.id,
                    name: userData.name,
                    email: email,
                    profile_picture: "",
                    role: userData.role,
                    bio: userData.bio,
                    password: userData.password,
                });

            if (profileError) {
                return { error: profileError };
            }

        }

        return { error: null, user: data.user, session: data.session };
    } catch (err) {
        return { error: err };
    }
};

export const signIn = async (email, password) => {
    if (!supabase) {
        return { error: { message: "Supabase is not configured." } };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { error: { message: "Please enter a valid email address." } };
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) return { error };

        return { error: null, user: data.user, session: data.session };
    } catch (err) {
        return { error: err };
    }
};