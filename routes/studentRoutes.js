import express from "express";

import Student from "../db_utils/student_model.js";
import Mentor from "../db_utils/mentor_model.js";
const studentRouter = express.Router();

//creating the student
studentRouter.post("/", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res
      .status(200)
      .json({ message: "student created succesfully", postedData: newStudent });
  } catch (err) {
    res.status(500).json({ message: "failed to create an user", err });
  }
});

//assigning or updating the mentor to an student

studentRouter.put("/assignMentor/:studentId/:mentorId", async (req, res) => {
  const { studentId, mentorId } = req.params;

  const student = await Student.findOne({ id: studentId });

  if(!student.mentor.length) {

    const mentorData = await Mentor.findOne({ id: mentorId });

    const assignMentor = await Student.updateOne(
      { id: studentId },
      { $set: { mentor: mentorData.name } }
    );
  
    const updatedStudentData = await Student.findOne({ id: studentId });
  
    res.json({
      message: `succesfully assigned the mentor ${updatedStudentData.mentor} to  student  ${updatedStudentData.name}`,
    });
    
  }
const oldName = student.mentor
  if(student.mentor.length) {

    const mentorData = await Mentor.findOne({ id: mentorId });

    await Student.updateOne(
      { id: studentId },
      {
        $addToSet: {
         
          previousMentor: oldName,
          
        },
      }
    );

    const assignMentor = await Student.updateOne(
      { id: studentId },
      { $set: { mentor:mentorData.name}}
    );
  
    const updatedStudentData = await Student.findOne({ id: studentId });
  
    res.json({
      message: `succesfully assigned the mentor ${updatedStudentData.mentor} to  student  ${updatedStudentData.name}`,
    });
    
  }
  
  

});

// studentRouter.get("/", async (req, res) => {
//   try {
//   const fetchedData =   await Student.find({});
//     res.status(200).json({ message: "student data fetched succesfully", data:fetchedData });
//   } catch (err) {
//     res.status(500).json({ message: "failed to fetch the student", err });
//   }
// });

export default studentRouter;
