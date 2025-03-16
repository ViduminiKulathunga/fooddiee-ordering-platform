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
app.options("*", cors()); // Allow all OPTIONS requests

// When hosting
// const corsOptions = {
//   origin: "https://myapp.com", // Replace with your frontend's production URL
//   credentials: true,
// };
// app.use(cors(corsOptions)); // Apply the CORS settings globally

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/my/user", myUserRoute);

const port = 4000;
app.listen(port, () => {
  console.log(`Server started on localhost: ${port};
}`);
});
