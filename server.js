import app from "./app.js";
import "dotenv/config";

import { connectDB } from "./api/ConnectionToDB.js";

const { PORT } = process.env;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
