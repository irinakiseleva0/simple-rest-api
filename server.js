import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "X-API-Key"],
}));

app.get("/", (req, res) => {
    res.send("Hello from Express!");
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
