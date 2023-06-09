import mongoose from "mongoose";

const productsCollection= "products"

const productsSchema= new mongoose.Schema({

    id: {
        type:Number,
        unique:true,
        require:true
    },
    title: String,
    description: String,
    code: Number,
    price: Number,
    status:{
        type:Boolean,
        default:true
    },
    stock: Number,
    category: String,
    thumbnail: String,
    nombre: String,
    apellido:String,
    edad:Number
    
})

export const productsModel= mongoose.model(productsCollection, productsSchema)