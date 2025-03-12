import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_CONNECTION as string)
  .then(() => console.log("Connected to database"));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello!" });
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server started on localhost: ${port};
}`);
});
