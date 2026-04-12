import express from "express";
import { getUserById, updateUser, getAllUsers } from "../services/user.ts";
const router = express.Router();

//GET ALL USERS
router.get("/", async (req, res) => {
  try { 
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// GET USER PROFILE
router.get("/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
});

// UPDATE PROFILE
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;