import mongoose from "mongoose";

const messagesCollection= "messages"

const messagesSchema= new mongoose.Schema({

    
    id: {
        type:Number,
        unique:true,
        require:true
    },
    messages: {
        type:Array,
        default:[]
    }
    
})

export const messagesModel= mongoose.model( messagesCollection, messagesSchema)