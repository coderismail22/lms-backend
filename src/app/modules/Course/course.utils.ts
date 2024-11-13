import { Types } from "mongoose";
import { Student } from "../student/student.model";
import { Course } from "./course.model";

export const syncCourseProgress = async (courseId: string) => {
  console.log("hitting sync progress util func");
  // Define types for populated course data to ensure TypeScript recognizes them
  const course = await Course.findById(courseId).populate<{
    subjects: Array<{
      _id: Types.ObjectId;
      topics: Array<{
        _id: Types.ObjectId;
        lessons: Array<{
          _id: Types.ObjectId;
        }>;
      }>;
    }>;
  }>({
    path: "subjects",
    populate: {
      path: "topics",
      populate: {
        path: "lessons",
        model: "Lesson",
      },
      model: "Topic",
    },
    model: "Subject",
  });

  if (!course) throw new Error("Course not found");

  // Find all students enrolled in this course
  const students = await Student.find({ "courses.courseId": courseId });

  for (const student of students) {
    // Locate the specific course progress for the student
    const courseProgress = student.courses.find(
      (c) => c.courseId.toString() === courseId,
    );

    if (courseProgress) {
      // Iterate over each subject in the course
      for (const subject of course.subjects) {
        // Ensure subjectProgress exists or initialize it
        let subjectProgress = courseProgress.subjects.find(
          (s) => s.subjectId.toString() === subject._id.toString(),
        );

        if (!subjectProgress) {
          subjectProgress = { subjectId: subject._id, topics: [] };
          courseProgress.subjects.push(subjectProgress);
        }

        // Iterate over each topic in the subject
        for (const topic of subject.topics) {
          // Ensure topicProgress exists or initialize it
          let topicProgress = subjectProgress.topics.find(
            (t) => t.topicId.toString() === topic._id.toString(),
          );

          if (!topicProgress) {
            topicProgress = { topicId: topic._id, lessons: [] };
            subjectProgress.topics.push(topicProgress);
          }

          // Iterate over each lesson in the topic
          for (const lesson of topic.lessons) {
            // Ensure lessonProgress exists or initialize it
            const lessonProgress = topicProgress.lessons.find(
              (l) => l.lessonId.toString() === lesson._id.toString(),
            );

            if (!lessonProgress) {
              topicProgress.lessons.push({
                lessonId: lesson._id,
                isAccessible: false,
                isCompleted: false,
                completedAt: null,
              });
            }
          }
        }
      }

      // Save the updated student progress with newly added content
      await student.save();
      console.log("new lesson added successfully", student);
    }
  }
};
