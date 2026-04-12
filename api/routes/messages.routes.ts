import express from "express";
import {
  sendMessage,
  getConversation,
  updateMessage,
  deleteMessage,
} from "../services/messages.ts";

const router = express.Router();

// SEND MESSAGE
router.post("", async (req, res) => {
  try {
    const message = await sendMessage(req.body);
    res.status(201).json(message);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// GET CONVERSATION
router.get("/:user/:withId", async (req, res) => {
  try {
    const { user, withId } = req.params;

    const messages = await getConversation(withId, user);
    res.status(200).json(messages);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE MESSAGE
router.put("/:id", async (req, res) => {
  try {
    const updated = await updateMessage(req.params.id, req.body.content);
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE MESSAGE
router.delete("/:id", async (req, res) => {
  try {
    await deleteMessage(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;