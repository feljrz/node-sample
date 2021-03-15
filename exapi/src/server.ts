import 'reflect-metadata'
import express from 'express';
import "./database" //Por padrao reqonhece que o arquivo de importação é o index
import { router } from './routes'

const app = express();

app.use(express.json())
app.use(router)


app.listen(3333, () => {console.log("Server is running!")})