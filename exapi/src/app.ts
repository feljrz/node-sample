import 'reflect-metadata'
import express, { NextFunction } from 'express';
import 'express-async-errors'

import createConnection from "./database" //Por padrao reqonhece que o arquivo de importação é o index
import { router } from './routes'
import { AppError } from './errors/AppError';


createConnection();
const app = express();

app.use(express.json())
app.use(router)

// Middleware 
app.use(
    (err: Error, request: Request, response: Response, _next: NextFunction) =>{
        if(err instanceof AppError){
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }
        
        // Se não for um dos especificados provavel que será um erro interno do servidor
        return response.status(500).json({
            status: "Error",
            message: `Internal server error ${err.message}`
        });
    }
);

export { app }