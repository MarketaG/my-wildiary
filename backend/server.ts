import "dotenv/config";

import express from "express";
import cors from "cors";
import observationRoutes from "./routes/observations";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/observations", observationRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
