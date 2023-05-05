import express from 'express'
import fs from 'fs'

const path = "productos.json";
const utf = "utf-8";

const app=express()
app.use(express.urlencoded({extended:true}))


app.get('/products', (req, res) => {

    const data = fs.readFileSync(path, utf);
    const products = JSON.parse(data);
    const limit = parseInt(req.query.limit); 

    if (limit) {
    const firstProducts = products.slice(0, limit);
    res.send(firstProducts);
    } else {
    res.send(products);
    }
});

app.get('/products/:id', (req, res) => {
    const data = fs.readFileSync(path, utf);
    const products = JSON.parse(data);
    let id= req.params.id
    let prod = products.find((prod)=>{return prod.id === parseInt(id)})
    if(!prod){return res.send(`{id${id} :"id no encontrado"}`)}
    res.send(prod)
})



const server= app.listen(8080, ()=> console.log("conectado "))
