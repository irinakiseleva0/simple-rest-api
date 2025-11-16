import express from "express";
import cors from "cors";
import config from "./config/config.js";
import { logMiddleware } from "./middleware/logger.js";
import { validateApiKey } from "./middleware/apiKey.js";
import userRoutes from "./routes/userRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import { initializeDatabase } from "./config/database.js";

const app = express();

await initializeDatabase();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "X-API-Key", "Origin", "Accept"],
    })
);


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, X-API-Key"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the API",
        version: "1.0.0",
        environment: "production",
        endpoints: { users: "/users", cars: "/cars" },
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv,
    });
});

app.use("/users", validateApiKey, userRoutes);
app.use("/cars", validateApiKey, carRoutes);

app.use((req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: `Route ${req.method} ${req.path} not found`,
    });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
        ...(config.isDevelopment() && { stack: err.stack }),
    });
});

const PORT = config.port || process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
