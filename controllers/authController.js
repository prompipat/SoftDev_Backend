import { signUp, signIn } from "../services/authService.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password, name, role, bio } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Email, password, and name are required." });
    }

    const { error, user, session } = await signUp(email, password, {
      name,
      role,
      bio,
    });

    if (error) {
      return res
        .status(400)
        .json({ error: error.message || "Signup failed." });
    }

    return res.status(201).json({
      message: "User registered successfully",
      user,
      session,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ error: "Email and password are required." });
        }

        const { error, user, session } = await signIn(email, password);

        if (error) {
            return res
                .status(401)
                .json({ error: error.message || "Invalid email or password." });
        }

        return res.status(200).json({
            message: "Login successful",
            user,
            session,
        });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
};
