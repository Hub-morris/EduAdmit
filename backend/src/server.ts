import "./config/env.js";
import app from "./app.js";
import prisma from "./config/database.js";
import { env } from "./config/env.js";

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("PostgreSQL connected");

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Unable to start server", error);
    process.exit(1);
  }
};

startServer();