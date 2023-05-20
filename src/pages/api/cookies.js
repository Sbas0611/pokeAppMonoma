import cookieParser from "cookie-parser";

// Middleware para analizar las cookies en las solicitudes
const cookiesMiddleware = cookieParser();

export default function cookiesHandler(req, res, next) {
    cookiesMiddleware(req, res, next);
}
