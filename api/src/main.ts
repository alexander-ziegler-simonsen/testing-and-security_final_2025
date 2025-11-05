import dotenv from 'dotenv'

import express from 'express';
const app = express();
const port = process.env.PORT ?? 3000;

dotenv.config({ path: '.env'});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
