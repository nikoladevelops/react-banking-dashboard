import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "../config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI not set in .env");
  process.exit(1);
}

app.use(cookieParser());

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello from backend!" });
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
