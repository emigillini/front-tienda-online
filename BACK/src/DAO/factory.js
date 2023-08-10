import config from "../config/config.js";
import MongoSingleton from "../utils.js";
import { CartManagerBD } from "./managers/CartManagerBD.js";
import { CartManagerFS } from "./managers/CartManagerFS.js";
import { ProductManagerBD } from "./managers/ProductManagerBD.js";
import { ProductManagerFS } from "./managers/ProductManagerFS.js";


async function getProductManager() {
    if (config.persistence === "mongo") {
        await MongoSingleton.getInstance();
        return new ProductManagerBD();
    } else if (config.persistence === "MEM") {
        return new ProductManagerFS();
    } else {
        throw new Error("Tipo de persistencia no válido");
    }
}

async function getCartManager() {
    if (config.persistence === "mongo") {
        await MongoSingleton.getInstance();
        return new CartManagerBD();
    } else if (config.persistence === "MEM") {
        return new CartManagerFS();
    } else {
        throw new Error("Tipo de persistencia no válido");
    }
}

const ProductManagerPromise = getProductManager();
const CartManagerPromise = getCartManager();

export { ProductManagerPromise, CartManagerPromise };