import config from "../config";
import { USER_ROLE } from "../modules/user/user.constant";
import { User } from "../modules/user/user.model";

const superAdminData = {
  name: "admin",
  password: config.super_admin_password,
  role: USER_ROLE.superAdmin,
};

const seedSuperAdmin = async () => {
  // check if there is any other super admin
  const superAdmin = await User.findOne({ role: USER_ROLE.superAdmin });
  if (!superAdmin) {
    await User.create(superAdminData);
  }
};

export default seedSuperAdmin;
