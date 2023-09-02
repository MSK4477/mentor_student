import express from "express";
import Student from "../db_utils/student_model.js";
import Mentor from "../db_utils/mentor_model.js";

const studentRouter = express.Router();

// Creating a student
studentRouter.post("/", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(200).json({
      message: "Student created successfully",
      postedData: newStudent.name,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create a student", err });
  }
});

//getting the students

studentRouter.get("/", async (req, res) =>{
try{
  const studentDetails = await Student.find({})
  res.status(200).json({message:"fetched all students detail", fetchedData:studentDetails})
}catch(err){
  res.status(500).json({message:"can't fetch the user get" , Error:err})
}


})


// Assigning or updating the mentor for a student
studentRouter.put("/assignMentor/:studentId/:mentorId", async (req, res) => {
  const { studentId, mentorId } = req.params;

  try {
    const student = await Student.findOne({ id: studentId });

    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }
    const mentorData = await Mentor.findOne({ id: mentorId });
    if (!mentorData) {
      res.status(404).json({ message: "Mentor not found" });
      return;
    }

    if (!student.mentor.length) {
      await Student.updateOne(
        { id: studentId },
        { $set: { mentor: mentorData.name } }
      );

      const updatedStudentData = await Student.findOne({ id: studentId });
      res.json({
        message: `Successfully assigned the mentor ${updatedStudentData.mentor} to student ${updatedStudentData.name}`,
      });
    } else {
      const mentorData = await Mentor.findOne({ id: mentorId });
      if (!mentorData) {
        res.status(404).json({ message: "Mentor not found" });
        return;
      }

      const oldName = student.mentor;

      await Student.updateOne(
        { id: studentId },
        {
          $addToSet: {
            previouslyAssignedMentor: {
              mentorName: oldName,
            },
          },
        }
      );

      await Student.updateOne(
        { id: studentId },
        { $set: { mentor: mentorData.name } }
      );

      const updatedStudentData = await Student.findOne({ id: studentId });
      res.json({
        message: `Successfully assigned the mentor ${updatedStudentData.mentor} to student ${updatedStudentData.name}`,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error assigning mentor to student", err });
  }
});

export default studentRouter;
