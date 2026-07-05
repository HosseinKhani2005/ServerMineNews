const axios = require('axios');

const verifyCaptcha = async (req, res, next) => {
  try {
    const { recaptchaToken } = req.body;
    
    if (!recaptchaToken) {
      return res.status(400).json({
        error: "توکن امنیتی یافت نشد",
      });
    }

    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        },
        timeout: 5000,
      }
    );
    
    const { success, score } = response.data;
    console.log('🔐 reCAPTCHA Result:', { success, score });

    if (!success) {
      return res.status(401).json({
        error: 'توکن امنیتی نامعتبر است',
      });
    }

    if (score < 0.5) {
      return res.status(403).json({
        error: 'درخواست شما مشکوک تشخیص داده شد',
      });
    }

    req.recaptchaScore = score;
    next();
    
  } catch (error) {
    console.error('❌ reCAPTCHA error:', error.message);
    return res.status(500).json({
      error: 'خطا در بررسی امنیتی',
    });
  }
};

module.exports = { verifyCaptcha };