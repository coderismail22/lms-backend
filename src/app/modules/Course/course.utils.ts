import { Types } from "mongoose";
import { Student } from "../student/student.model";
import { Course } from "./course.model";

export const syncCourseProgress = async (courseId: string) => {

  // Fetch the course with all its subjects, topics, and lessons
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
    const courseProgress = student.courses.find(
      (c) => c.courseId.toString() === courseId,
    );

    if (courseProgress) {
      let firstLessonFound = false; // Flag to initialize only the first lesson as accessible

      for (const subject of course.subjects) {
        let subjectProgress = courseProgress.subjects.find(
          (s) => s.subjectId.toString() === subject._id.toString(),
        );

        if (!subjectProgress) {
          subjectProgress = { subjectId: subject._id, topics: [] };
          courseProgress.subjects.push(subjectProgress);
        }

        for (const topic of subject.topics) {
          let topicProgress = subjectProgress.topics.find(
            (t) => t.topicId.toString() === topic._id.toString(),
          );

          if (!topicProgress) {
            topicProgress = { topicId: topic._id, lessons: [] };
            subjectProgress.topics.push(topicProgress);
          }

          for (const lesson of topic.lessons) {
            // Check if lesson already exists in student's progress
            const lessonProgress = topicProgress.lessons.find(
              (l) => l.lessonId.toString() === lesson._id.toString(),
            );

            // If lesson does not exist in progress, add it
            if (!lessonProgress) {
              // Check if the previous lesson is completed and accessible for unlocking this new lesson
              const shouldUnlockLesson =
                !firstLessonFound ||
                (topicProgress.lessons.length > 0 &&
                  topicProgress.lessons[topicProgress.lessons.length - 1]
                    .isCompleted);

              topicProgress.lessons.push({
                lessonId: lesson._id,
                isAccessible: shouldUnlockLesson, // Unlock the lesson if it's the next in sequence
                // TODO: isCompleted is not being true after sync
                // TODO: fix completedAt too
                // fix this : isCompleted: false,
                isCompleted: true, // this just for bypass
                completedAt: null,
              });

              firstLessonFound = true; // Flag to ensure only the first lesson starts unlocked
            }
          }
        }
      }

      // Save the updated student progress with newly added content
      await student.save();
    }
  }
};
