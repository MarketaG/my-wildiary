import "dotenv/config";
import express from "express";
import cors from "cors";
import { getDb } from "./db/connection";
import observationRoutes from "./routes/observations";
import animalRoutes from "./routes/animals";

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.use(express.json());

// health check endpoint
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Backend is running",
    environment: process.env.NODE_ENV || "development",
  });
});

// API routes
app.use("/api/observations", observationRoutes);
app.use("/api/animals", animalRoutes);

const PORT = process.env.PORT || 4000;

// start server with database connection
const startServer = async () => {
  try {
    await getDb();

    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(
        `Observations API: http://localhost:${PORT}/api/observations`
      );
      console.log(`Animals API: http://localhost:${PORT}/api/animals`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// graceful shutdown handlers
process.on("SIGINT", async () => {
  console.log("\n Shutting down gracefully...");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n Shutting down gracefully...");
  process.exit(0);
});

startServer();
