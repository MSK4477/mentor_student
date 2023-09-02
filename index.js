import express from "express";
import cors from "cors";
import path from "path";
import studentRouter from "./routes/studentRoutes.js";
import mentorRouter from "./routes/mentorRoutes.js";
import DbToConnect from "./db_utils/mongoose_connection.js";
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", function (req, res) {
  res.sendFile(path.resolve("public/index.html"));
});
await DbToConnect();
const PORT = 4002;

app.use("/student", studentRouter);
app.use("/mentor", mentorRouter);
app.get("/", (req, res) => {
  res.json("hello bro");
});

app.listen(PORT, () => {
  console.log("server started on", PORT);
});
