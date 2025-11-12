import express from "express";
import { logMiddleware } from "./middleware/middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "Dave" },
];

app.use(express.json());

// 1) Middleware to log requests
app.use(async (req, res, next) => {
    const date = new Date().toISOString();
    console.log(`[${date}] ${req.method} ${req.url}`);

    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const data = await response.json();
    req.data = data;
    console.log(data);

    next();
});

// 2) Async middleware fetching external data
app.use(async (req, res, next) => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        if (!response.ok) throw new Error(`Upstream error: ${response.status}`);
        req.data = await response.json();
        next();
    } catch (err) {
        next(err);
    }
});

// GET route
app.get("/", logMiddleware, (req, res) => {
    res.json(users);
});


// POST route
app.post("/", (req, res) => {
    res.status(201).json({
        message: "Received",
        body: req.body || null,
        data: req.data,
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});

// Global error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.error("Error:", err.message || err);
    res.status(500).json({ message: "Internal server error" });
});

// Start the server safely
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Change PORT or stop the existing process.`);
    } else if (err.code === "EACCES") {
        console.error(`Permission denied for port ${PORT}. Try a port >= 1024.`);
    } else {
        console.error(err);
    }
    process.exit(1);
});
