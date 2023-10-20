import { Router } from "express";
import Product from "../models/Product.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const products = await Product.findById(id);
  res.json(products);
});

router.post("/", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

export default router;
