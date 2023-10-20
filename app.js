import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import logger from "morgan";
import productRouter from "./controllers/product.js";

export async function startApp() {
  await mongoose.connect(process.env.DATABASE_URL);
  const app = express();

  // Third-party middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(logger(process.env.NODE_ENV === "production" ? "tiny" : "dev"));

  // Health checker
  app.get("/health", (req, res) => {
    res.status(200).send("Okay!");
  });

  // Routes
  app.use("/products", productRouter);

  const port = process.env.PORT || 3000;
  app.listen({ port }, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server is ready and accepting connections...`);
  });
}
