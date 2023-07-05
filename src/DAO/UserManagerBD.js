import { userModel } from "./models/user_model.js";


export class UserManagerBD{
    constructor(){
        this.model = userModel;
    }
   

    async getAll(){
        let result;
        try {
            result = await userModel.find()
        } catch (error) {
            console.log(error)
        }
    
        return result;

    }

    async getByEmail (email) {
        let result;
        try {
            result = await userModel.findOne({ email })
            
        } catch (error) {
            console.log(error)
        }
    
        return result;
    }
    
    async createUser (user){
    let result;
    try {
        result = await userModel.create(user)
    } catch (error) {
        console.log(error)
    }

    return result;
}
}




