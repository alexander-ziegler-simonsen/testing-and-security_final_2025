import dotenv from 'dotenv'

import userRoutes from './routes/UserRoutes';

import express from 'express';
dotenv.config({ path: '.env' });

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use("/api/users", userRoutes);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
