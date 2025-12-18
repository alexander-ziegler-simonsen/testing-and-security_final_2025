// import dotenv from 'dotenv' // problems with linter
import "dotenv/config"; // works fine with linters

import userRoutes from './routes/UserRoutes';
import productRoutes from './routes/ProductRoutes';
import commentRoutes from './routes/CommentRoutes';
import AuthRoutes from './routes/AuthRoutes';
import searchRoutes from "./routes/SearchRoutes";

import express from 'express';
import imageRoutes from "./routes/ImageRoutes";
//dotenv.config({ path: '.env' });

import path from "path";

const app = express();
const port = process.env.PORT ?? 3000;

// image requests
app.use("/uploads", 
    express.static(path.join(process.cwd(), 
    "src/uploads"), {
        immutable: true,
        maxAge: "30d"
    })
);

// this one have to be before express.json
app.use("/api/images", imageRoutes);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);
app.use("/auth", AuthRoutes);
app.use("/api/search", searchRoutes);





app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
