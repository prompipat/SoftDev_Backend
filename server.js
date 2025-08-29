import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import blog_imageRoutes from "./routes/blog_imageRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import favouriteRoutes from "./routes/favouriteRoutes.js";
import restaurantImageRoutes from "./routes/restaurantImageRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import packageImageRoutes from "./routes/packageImageRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import verificationFormRoutes from "./routes/verificationFormRoutes.js";
import { swaggerUi, specs } from "./config/swagger.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", orderRoutes);
app.use("/api", blogRoutes);
app.use("/api", blog_imageRoutes);
app.use("/api", reviewRoutes);
app.use("/api", paymentRoutes);
app.use("/api", favouriteRoutes);
app.use("/api", restaurantImageRoutes);
app.use("/api", restaurantRoutes);
app.use("/api", packageImageRoutes);
app.use("/api", packageRoutes);
app.use("/api", verificationFormRoutes);
app.get("/", (req, res) => {
  res.send("API is running... <a href='/api-docs'>View API documentation</a>");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});