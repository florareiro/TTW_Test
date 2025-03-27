import express from "express";
import { NewtonRaphsonAlgorithm } from "../models/square-root/newton-raphson-algorythm.class";
import { SqrtCalculator } from "../models/square-root/sqrt-calculator.class";

const router = express.Router();
const cache = new Map<number, number>();

router.post("/calculate", (req, res) => {
    const { number } = req.body;
  
    if (typeof number !== "number" || number < 0) {
      return res.status(400).json({ error: "Invalid number. Provide a non-negative number." });
    }
  
    if (cache.has(number)) {
      return res.json({ number, squareRoot: cache.get(number), cached: true });
    }
  
    const algorithm = new NewtonRaphsonAlgorithm();
    const calculator = new SqrtCalculator(number, algorithm);
    const result = calculator.calculate();
  
    cache.set(number, result);
  
    res.json({ number, squareRoot: result, cached: false });
  });
  
  export default router;
