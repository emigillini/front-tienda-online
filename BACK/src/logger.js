import winston from "winston"


const customLevelsOptions={
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5,
    },
    colors:{
        fatal:"red",
        error:"red",
        warning:"yellow",
        info:"green",
        http: "blue",
        debug:"magenta",  
    }
}

export const logger= winston.createLogger({
    levels: customLevelsOptions.levels,

    transports:[
        new winston.transports.Console({level: "info",
        format: winston.format.combine(
            winston.format.colorize({colors: customLevelsOptions.colors}),
            winston.format.simple()
        )
    }),
    new winston.transports.File ({filename:"./errors.log", level:"info", format: winston.format.simple()})
    ]
})
export const addLogger = (req, res, next)=>{
    req.logger = logger;
    next()
}