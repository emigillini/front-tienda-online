export const logRequest = (req, res, next) => {
    console.log(`Request recibida: ${new Date()}`);
    next();
};
