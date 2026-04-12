import { register } from "../services/auth/register.ts";
import { login } from "../services/auth/login.ts";
import express from "express";

const router = express.Router();

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
    };
  }
}
// REGISTER
router.post("/register", async (req, res) => {
  try {
    const user = await register(req.body);
    req.user = {id: user.id}
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await login(req.body);
    if (!user) {
      return res.status(404).json({ error: "Invalid credentials" });
    }
    req.user = {id: user.id}
    res.status(200).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;