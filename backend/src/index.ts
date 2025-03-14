import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

mongoose
  .connect(process.env.MONGODB_CONNECTION as string)
  .then(() => console.log("Connected to database"));

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/my/user", myUserRoute);

const port = 4000;
app.listen(port, () => {
  console.log(`Server started on localhost: ${port};
}`);
});
