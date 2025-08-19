const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//Init Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/", async (req, res) => {
  res.json({ message: "SoftDev Backend is running!" });
});

// get all users
app.get("/users", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// insert user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.listen(8000, () => {
  console.log(`server is running on http://localhost:8000`);
});
