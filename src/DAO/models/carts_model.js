import mongoose from "mongoose";

const cartsCollection= "carts"

const cartsSchema= new mongoose.Schema({

    
    id: {
        type:Number,
        unique:true,
        require:true
    },
    products: {
        type:Array,
        default:[]
    }
    
})

export const cartsModel= mongoose.model(cartsCollection, cartsSchema)