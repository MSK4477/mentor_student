import { model, Schema } from "mongoose";

const mentorSchema = new Schema({
  id: {
    type: "string",
  },
  name: {
    type: "string",
  },
  students: {
    studentId: {  type: "string"},
    studentName:{ type: "string"}
  }
});

const Mentor = model("mentor", mentorSchema);

export default Mentor;
