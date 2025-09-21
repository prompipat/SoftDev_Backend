import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import blog_imageRoutes from "./routes/blog_imageRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import restaurantImageRoutes from "./routes/restaurantImageRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import packageImageRoutes from "./routes/packageImageRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import verificationFormRoutes from "./routes/verificationFormRoutes.js";
import restaurantMainCategoryRoutes from "./routes/restaurantMainCategoryRoutes.js";
import restaurantEventCategoryRoutes from "./routes/restaurantEventCategoryRoutes.js";
import restaurantFoodCategoryRoutes from "./routes/restaurantFoodCategoryRoutes.js";
import restaurantMainCategoryMapRoutes from "./routes/restaurantMainCategoryMapRoutes.js";
import restaurantEventCategoryMapRoutes from "./routes/restaurantEventCategoryMapRoutes.js";
import { swaggerUi, specs } from "./config/swagger.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", orderRoutes);
app.use("/api", blogRoutes);
app.use("/api", blog_imageRoutes);
app.use("/api", reviewRoutes);
app.use("/api", paymentRoutes);
app.use("/api", favoriteRoutes);
app.use("/api", restaurantImageRoutes);
app.use("/api", restaurantRoutes);
app.use("/api", packageImageRoutes);
app.use("/api", packageRoutes);
app.use("/api", verificationFormRoutes);
app.use("/api", restaurantMainCategoryRoutes);
app.use("/api", restaurantEventCategoryRoutes);
app.use("/api", restaurantFoodCategoryRoutes);
app.use("/api", restaurantMainCategoryMapRoutes);
app.use("/api", restaurantEventCategoryMapRoutes);
app.get("/", (req, res) => {
  res.send("API is running... <a href='/api-docs'>View API documentation</a>");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});