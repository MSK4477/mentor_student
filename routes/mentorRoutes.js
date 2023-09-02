import express from "express";
import Mentor from "../db_utils/mentor_model.js";
import Student from "../db_utils/student_model.js";
// import {v4 } from "uuid"
const mentorRouter = express.Router();

// Create a mentor
mentorRouter.post("/", async (req, res) => {
  try {
    const newMentor = new Mentor(req.body);
    await newMentor.save();
    res.status(200).json({
      message: "Mentor created successfully",
      postedData: newMentor,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create a mentor", err });
  }
});
mentorRouter.get("/", async (req, res) => {
  try {
    const mentors = await Mentor.find({})
    res
      .status(200)
      .json({ message: "student fetched succesfully", Data: mentors });
  } catch (err) {
    res.status(500).json({ message: "failed to create an user", err });
  }
});


// Add students to the mentor
mentorRouter.put("/addStudent/:studentId/:mentorId", async (req, res) => {
  const { studentId, mentorId } = req.params;
  try {
    const newStudent = await Student.findOne({ id: studentId });

    await Mentor.updateOne(
      { id: mentorId },
      {
        $addToSet: {
          students: {
            studentName: newStudent.name,
            studentId: newStudent.id,
          },
        },
      }
    );

    res.status(200).json({
      message: `Successfully assigned the student ${newStudent.name} to the mentor`,
    });
  } catch (err) {
    res.status(500).json({
      message: `Student with the id: ${studentId} doesn't exist`,
    });
  }
});

// Show students for a particular mentor
mentorRouter.get("/:mentorId", async (req, res) => {
  const { mentorId } = req.params;
  try {
    const fetchedData = await Mentor.find({ id: mentorId }, { students: 1 });
    res.status(200).json({
      message: "Mentor data fetched successfully",
      data: fetchedData,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch the mentor", err });
  }
});

export default mentorRouter;
