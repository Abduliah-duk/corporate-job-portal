import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";

// Setup
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Firebase Admin initialization
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Example route
app.get("/", (req, res) => {
  res.send("🚀 Firebase Backend is Running Successfully!");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
o

