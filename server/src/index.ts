import express from "express";
import cors from "cors"; // import cors

const app = express();
const PORT = 5900;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from backend on port 5900!" });
});

app.get("/test", (req, res) => {
  res.json({ message: "Testing" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
