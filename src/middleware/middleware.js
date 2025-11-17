export const exampleMiddleware = (req, res, next) => {
    console.log("Example middleware executed.");
    next();
};

export default exampleMiddleware;
// #Logs a message every time it runs.Passes control to the next middleware or route.Is exported both as a named and default export