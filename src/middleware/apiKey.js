import config from "../config/config.js";

export const validateApiKey = (req, res, next) => {
    const apiKeyHeader = req.headers["x-api-key"];
    const authHeader = req.headers["authorization"];

    let apiKey = apiKeyHeader;

    if (!apiKey && authHeader && authHeader.startsWith("Bearer ")) {
        apiKey = authHeader.replace("Bearer ", "");
    }

    if (!apiKey) {
        return res.status(401).json({
            error: "Unauthorized",
            message:
                "API key is required. Provide it in X-API-Key header or Authorization header.",
        });
    }

    if (apiKey !== config.apiKey) {
        return res.status(403).json({
            error: "Forbidden",
            message: "Invalid API key",
        });
    }

    next();
};

export const validateApiKeyProduction = (req, res, next) => {
    if (config.isProduction()) {
        return validateApiKey(req, res, next);
    }
    next();
};

export default validateApiKey;
