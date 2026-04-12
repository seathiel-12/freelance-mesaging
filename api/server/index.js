import express from "express";
import authRoutes from "../routes/auth.routes.ts";
import messageRoutes from "../routes/messages.routes.ts";
import userRoutes from "../routes/user.routes.ts";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(3005, () => {
  console.log(`Server running on ${process.env.NEXT_PUBLIC_API_URL}`);
});