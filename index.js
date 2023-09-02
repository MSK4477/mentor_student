import express from "express";
import cors from "cors";
import studentRouter from "./routes/studentRoutes.js";
import mentorRouter from "./routes/mentorRoutes.js";
import DbToConnect from "./db_utils/mongoose_connection.js";
const app = express();
app.use(express.json());
app.use(cors());
await DbToConnect();
const PORT = process.env.PORT || 4001;

app.use("/student", studentRouter);
app.use("/mentor", mentorRouter);
app.get("/", (req, res) => {
  res.json("hello bro");
});

app.listen(PORT, () => {
  console.log("server started on", PORT);
});
