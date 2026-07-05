const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  try {
    const { password: newPassword } = req.body;
    const { userId } = req.userData; 


    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "کاربر یافت نشد" });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).send({ 
        error: "رمز عبور جدید نمی‌تواند مشابه رمز عبور قبلی باشد" 
      });
    }


    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).send({ error: "خطا در به‌روزرسانی کاربر" });
    }

    res.status(200).send({ 
      success: true,
      message: "رمز عبور با موفقیت تغییر کرد" 
    });

  } catch (error) {
    res.status(500).send({ 
      error: "خطا در تغییر رمز عبور، لطفاً دوباره تلاش کنید" 
    });
  }
};

module.exports = { changePassword };