import express from "express";
import config from "./config/config.js";
import { logMiddleware } from "./middleware/logger.js";
import { validateApiKey } from "./middleware/apiKey.js";
import userRoutes from "./routes/userRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import { initializeDatabase } from "./config/database.js";

const app = express();

await initializeDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the API",
        version: "1.0.0",
        environment: config.nodeEnv,
        endpoints: {
            users: "/users",
            cars: "/cars"
        }
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv
    });
});

app.use("/users", validateApiKey, userRoutes);
app.use("/cars", validateApiKey, carRoutes);

app.use((req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: `Route ${req.method} ${req.path} not found`
    });
});

app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
        ...(config.isDevelopment() && { stack: err.stack })
    });
});

app.listen(config.port, () => {
    console.log(`✅ Server running on http://localhost:${config.port}`);
    console.log(`📊 Environment: ${config.nodeEnv}`);
    console.log(
        `🔒 API Key protection: ${config.apiKey ? "ENABLED" : "DISABLED (no API_KEY set)"
        }`
    );
    console.log(`\nAPI Endpoints:`);
    console.log(`  GET    /              - Welcome (public)`);
    console.log(`  GET    /health        - Health check (public)`);
    console.log(`  GET    /users         - Get all users (protected)`);
    console.log(`  GET    /users/:id     - Get user by id (protected)`);
    console.log(`  POST   /users         - Create user (protected)`);
    console.log(`  PUT    /users/:id     - Update user (protected)`);
    console.log(`  DELETE /users/:id     - Delete user (protected)`);
    console.log(`  GET    /cars          - Get all cars (protected)`);
    console.log(`  GET    /cars/:id      - Get car by id (protected)`);
    console.log(`  POST   /cars          - Create car (protected)`);
    console.log(`  PUT    /cars/:id      - Update car (protected)`);
    console.log(`  DELETE /cars/:id      - Delete car (protected)`);
});

export default app;
