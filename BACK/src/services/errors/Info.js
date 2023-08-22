export const generateProductErrorInfo = product=> {
    return `Uno o mas parametros no son validos: 
    - title: necesita recibir un String, recibió: ${product.title}
    - description: necesita recibir un String, recibió: ${product.description}
    - price: necesita recibir un Int, recibió: ${product.price}`
}

