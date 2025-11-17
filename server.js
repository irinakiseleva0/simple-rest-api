import express from "express";
import cors from "cors";
import User from "./models/User.js";
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use(
    cors({
        origin: "*", // or ["http://localhost:5173", "https://your-frontend-domain"]
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "X-API-Key"],
    })
);

app.options("*", cors());

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the API",
        version: "1.0.0",
        environment: "production",
        endpoints: { users: "/users", cars: "/cars" }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
