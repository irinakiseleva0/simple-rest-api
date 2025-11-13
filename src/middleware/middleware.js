export const exampleMiddleware = (req, res, next) => {
    console.log("Example middleware executed.");
    next();
};

export default exampleMiddleware;