import config from "../config";
import { User } from "../modules/users/user.model";

const superAdmin = {
  id: config.SUPER_ADMIN_ID,
  password: config.SUPER_ADMIN_PASS,
  email: config.SUPER_ADMIN_EMAIL,
  phone: config.SUPER_ADMIN_PHONE,
  role: config.SUPER_ADMIN_ROLE,
};

const seedSuperAdmin = async () => {
  const isExisted = await User.findOne({ id: config.SUPER_ADMIN_ID });

  if (!isExisted) {
    await User.create(superAdmin);
  }
};

export default seedSuperAdmin;
