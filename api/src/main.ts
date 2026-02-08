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
import helmet from "helmet";
import path from "path";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swagger";

//import swaggerUiDist from "swagger-ui-dist";
//import { fileURLToPath } from "url";

//import swaggerSpec from "./swagger/swagger.json" assert { type: "json" };

const app = express();
const port = process.env.PORT ?? 3000;

// // swagger setup
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Serve swagger-ui assets
// app.use("/swagger-ui", express.static(swaggerUiDist.getAbsoluteFSPath()));

// // Serve OpenAPI spec
// app.get("/swagger.json", (req, res) => {
//     res.json(swaggerSpec);
// });

// // Swagger UI HTML
// app.use("/docs", express.static(path.join(__dirname, "public/docs")));

// app.get("/health", (req, res) => {
//     res.json({ ok: true });
// });



app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// header setting - by defualt
// Cross-Origin-Opener-Policy: same-origin
// Cross-Origin-Resource-Policy: same-origin

app.use(helmet());


// core rules
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));


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
