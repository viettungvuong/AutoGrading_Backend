const SchoolClass = require("../models/schoolClass");
const Student = require("../models/student");

const studentsOfClass = async (classId) => {
  try {
    const schoolClass = await SchoolClass.findById(classId);
    if (!schoolClass) {
      throw "No class exists";
    }

    const res = [];
    const students = schoolClass.students;
    students.forEach(async (student) => {
      const findStudent = await Student.findById(student._id);
      if (findStudent) {
        res.push(findStudent);
      }
    });
    return res;
  } catch (err) {
    return null;
  }
};

const addStudentToClass = async (studentId, classId) => {
  try {
    const schoolClass = await SchoolClass.findById(classId);
    const student = await Student.findById(studentId);
    if (!schoolClass) {
      throw "Class does not exists";
    }
    if (!student) {
      throw "Student does not exists";
    }
    schoolClass.students.push(studentId);
    await schoolClass.save();
    return "Student added to class successfully";
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  addStudentToClass,
  studentsOfClass,
};
