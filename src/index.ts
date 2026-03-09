import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import listMasterRoutes from "./routes/listMaster.routes";
import listDetailsRoutes from "./routes/listDetails.routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/lists", listMasterRoutes);
app.use("/api/details", listDetailsRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handler — must be last
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running → http://localhost:${PORT}`);
});