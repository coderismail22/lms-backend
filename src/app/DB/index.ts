import config from "../config";
import { TAdmin } from "../modules/admin/admin.interface";
import { Admin } from "../modules/admin/admin.model";
import { USER_ROLE } from "../modules/user/user.constant";

const superAdminData: TAdmin = {
  name: "admin",
  email: config.super_admin_email as string,
  password: config.super_admin_password as string,
  role: USER_ROLE.superAdmin,
  phone: "",
};

const seedSuperAdmin = async () => {
  // check if there is any other super admin
  const superAdmin = await Admin.findOne({ role: USER_ROLE.superAdmin });
  if (!superAdmin) {
    await Admin.create(superAdminData);
  }
};

export default seedSuperAdmin;
