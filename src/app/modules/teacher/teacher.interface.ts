export type TTeacher = {
  teacherName: string;
  email: string;
  phone?: string;
  profileImg?: string;
  subject: string;
  qualifications: string[];
  joiningDate: string;
  createdAt?: Date;
  updatedAt?: Date;
};
