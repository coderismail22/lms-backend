export type TLesson = {
  name: string;
  description: string;
  content: string;
  type: "video" | "assignment" | "quiz" | "post";
  isCompleted: boolean;
  completedAt: Date;
  materials: [
    {
      name: string;
      link: string;
    },
  ];
  isDeleted: boolean;
};
