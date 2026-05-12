import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI not set in .env");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from backend on port 5900!" });
});

app.get("/test", (req, res) => {
  res.json({ message: "Testing" });
});

connectDB(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
