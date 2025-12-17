// import dotenv from 'dotenv' // problems with linter
import "dotenv/config"; // works fine with linters

import { productRouter } from "./modules/product/product.routes.js";

import express from 'express';
//dotenv.config({ path: '.env' });

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
