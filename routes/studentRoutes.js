import express from "express";
import Student from "../db_utils/student_model.js";
import Mentor from "../db_utils/mentor_model.js";
const studentRouter = express.Router();

// Create a student
studentRouter.post("/", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res
      .status(200)
      .json({ message: "Student created successfully", postedData: newStudent });
  } catch (err) {
    // Handle errors if student creation fails
    res.status(500).json({ message: "Failed to create a student", err });
  }
});

// Assign or update the mentor for a student
studentRouter.put("/assignMentor/:studentId/:mentorId", async (req, res) => {
  try {
    const { studentId, mentorId } = req.params;
    const student = await Student.findOne({ id: studentId });

    if (!student.mentor.length) {
      const mentorData = await Mentor.findOne({ id: mentorId });

      await Student.updateOne(
        { id: studentId },
        { $set: { mentor: mentorData.name } }
      );

      const updatedStudentData = await Student.findOne({ id: studentId });

      res.json({
        message: `Successfully assigned the mentor ${updatedStudentData.mentor} to student ${updatedStudentData.name}`,
      });
    }

    const oldName = student.mentor;
    if (student.mentor.length) {
      const mentorData = await Mentor.findOne({ id: mentorId });

      await Student.updateOne(
        { id: studentId },
        {
          $addToSet: {
            previousMentor: oldName,
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
    // Handle errors if mentor assignment fails or if student doesn't exist
    res.status(500).json({ message: "Mentor assignment failed", err });
  }
});

// Get a list of all students
studentRouter.get("/", async (req, res) => {
  try {
    const fetchedData = await Student.find({});
    res
      .status(200)
      .json({ message: "Student data fetched successfully", data: fetchedData });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch students", err });
  }
});

export default studentRouter;
