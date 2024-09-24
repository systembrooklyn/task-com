module.exports = ({ env }) => ({
    email: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'smtp.gmail.com',  // خادم Gmail
        port: 465,               // منفذ SSL الخاص بـ Gmail
        auth: {
          user: env('SMTP_USERNAME', 'system.bbs.2024@gmail.com'), // البريد الإلكتروني
          pass: env('SMTP_PASSWORD', 'tvvieicmvmrmxsxr'),           // كلمة المرور
        },
        secure: true, // استخدم true لـ SSL (المنفذ 465)
      },
      settings: {
        defaultFrom: 'system.bbs.2024@gmail.com', // البريد الذي سيتم الإرسال منه
        defaultReplyTo: 'system.bbs.2024@gmail.com',
      },
    },
  });
  