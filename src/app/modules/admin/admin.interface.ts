export type TAdmin = {
  name: string;
  password: string;
  profileImg?: string;
  email: string;
  phone: string;
  role: "superAdmin" | "admin";
};
