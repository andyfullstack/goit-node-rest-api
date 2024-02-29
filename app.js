import express from "express";
import morgan from "morgan";
import cors from "cors";
// import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();

import contactsRouter from "./routes/contactsRouter.js";

const app = express();

// const tiny = app.get("env") === "development" ? "dev" : "short";

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

// app.listen(3001, () => {
//   console.log("Server is running. Use our API on port: 3001");
// });

export default app;
