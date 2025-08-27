import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

app.use(express.json({
    limit: '10kb'
}));

import schoolRoutes from "./routes/schoolRoute.route.js";

app.use("/api/v1/schools", schoolRoutes);

export { app };