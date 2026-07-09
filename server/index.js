import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import contactRoute from "./routes/contactRoute.js";
import dentistRoute from "./routes/dentistRoute.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173").split(",");

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/contact", contactRoute);
app.use("/api/dentists", dentistRoute);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// Centralized error handler (e.g. multer file-type/size errors)
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(400).json({ error: err.message || "Something went wrong." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`PureDent server running on http://localhost:${PORT}`);
});