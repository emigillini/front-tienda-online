import { logger } from "../logger.js";


export class Cookiecontroller{
    setCookies(req, res){
        try {
            res.cookie("nombres", "Emiliano").send("Cookiessss");
        } catch (error) {
            logger.error(error);
            res.sendServerError("Error interno del servidor");
        }

    }
    setSignedCookies(req, res){
        try {
            res.cookie("secreto", "lo que guarda",{signed:true}).send("secreta");
        } catch (error) {
            logger.error(error);
            res.sendServerError("Error interno del servidor");
        }
    }
    async getSignedCookies(req, res){
        try {
            res.send(req.signedCookies);
        } catch (error) {
            logger.error(error);
            res.sendServerError("Error interno del servidor");
        }
    }
    async getCookies(req, res){
        try {
            res.send(req.cookies);
        } catch (error) {
            logger.error(error);
            res.sendServerError("Error interno del servidor");
        }
    }
    async deleteCookies(req, res){
        try {
            const { name } = req.params;
            res.clearCookie(name).send("Cookie borrada");
        } catch (error) {
            logger.error(error);
            res.sendServerError("Error interno del servidor");
        }
    }
}