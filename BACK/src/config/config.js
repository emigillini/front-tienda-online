import dotenv from 'dotenv';
import { Command } from "commander";

const program = new Command();

program 
    .option('--mode <mode>', 'Modo de trabajo', 'developmentMongo')
    
program.parse()

console.log("options" , program.opts())
console.log("argumentos",program.args)


const environment = program.opts().mode || 'developmentMongo';

dotenv.config({
    path: environment === 'developmentMongo' ? 'src/.env.developmentMongo' : 'src/.env.developmentFS'
})


export default {
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URL,
    githubAPIKey: process.env.GITHUB_SECRET,
    secret: process.env.SECRET
}
