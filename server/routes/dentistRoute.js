import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "..", "uploads");
const dataFile = path.join(__dirname, "..", "data", "dentists.json");

fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, "[]");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image uploads are allowed."));
    }
    cb(null, true);
  },
});

const router = Router();

router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const { fullName, specialization, email, phone, experienceYears, consultationFee, bio, workingDays } =
      req.body;

    if (!fullName?.trim() || !email?.trim() || !phone?.trim()) {
      return res.status(400).json({ error: "Full name, email, and phone are required." });
    }

    const dentist = {
      id: Date.now().toString(),
      fullName: fullName.trim(),
      specialization,
      email: email.trim(),
      phone: phone.trim(),
      experienceYears: Number(experienceYears) || 0,
      consultationFee: Number(consultationFee) || 0,
      bio: bio?.trim() || "",
      workingDays: workingDays ? JSON.parse(workingDays) : [],
      photoUrl: req.file ? `/uploads/${req.file.filename}` : null,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
    existing.push(dentist);
    fs.writeFileSync(dataFile, JSON.stringify(existing, null, 2));

    return res.status(201).json({ success: true, dentist });
  } catch (err) {
    console.error("Failed to save dentist:", err);
    return res.status(500).json({ error: "Failed to save dentist. Please try again." });
  }
});

router.get("/", (_req, res) => {
  const existing = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  res.json(existing);
});

export default router;