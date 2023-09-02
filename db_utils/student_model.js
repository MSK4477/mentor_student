import { model, Schema } from "mongoose";

const studentSchema = new Schema({
  id: {
    type: "string",
  },
  name: {
    type: "string",
  },
  mentor: {
 type:[]
  },
  previouslyAssignedMentor: {  
       
        type:[]
}
});

const Student = model("student", studentSchema);

export default Student;
