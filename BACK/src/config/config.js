    import dotenv from 'dotenv';
    import { Command } from "commander";
    import { logger } from '../logger.js';

    const program = new Command();

    program 
        .option('--mode <mode>', 'Modo de trabajo', 'development')
        .option('--persistence <persistence>', 'Tipo de persistencia', 'mongo');
    program.parse()

    logger.info("options" , program.opts())
    logger.warning("argumentos",program.args)


    const environment = program.opts().mode || 'development';
    const persistenceType = program.opts().persistence || 'mongo';

    dotenv.config({
        path: environment === 'development' ? 'src/.env.development' : logger.error("error")
    })

    export default {
        port: process.env.PORT,
        mongoURL: process.env.MONGO_URL,
        githubAPIKey: process.env.GITHUB_SECRET,
        secret: process.env.SECRET,
        persistence: persistenceType === 'MEM' ? 'MEM' : 'mongo',
        gmailcontra: process.env.MAILCONTRA,
        sidtwillio:process.env.SIDTWILLIO,
        tokentwillio:process.env.TOKENTWILLIO,
        numtwillio:process.env.NUMTWILLIO,
        pkstripe:process.env.PKSTRIPE
    }
