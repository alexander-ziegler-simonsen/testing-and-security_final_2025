import dotenv from 'dotenv'

import { productRouter } from "./modules/product/product.routes.js";

import express from 'express';
dotenv.config({ path: '.env' });

const app = express();
const port = process.env.PORT ?? 3000;


// mount all modules
app.use("/products", productRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
