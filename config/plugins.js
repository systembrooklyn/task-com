module.exports = ({ env }) => ({
    email: {
      provider: 'nodemailer',
      providerOptions: {
        service: 'gmail', // أو 'yahoo' أو 'outlook'، حسب خدمة البريد التي تستخدمها
        auth: {
          user: env('SMTP_USER'),
          pass: env('SMTP_PASSWORD'),
        },
        // اختياري: إعدادات الاتصال
        secure: true, // إذا كنت تستخدم SSL/TLS
        tls: {
          rejectUnauthorized: false, // يمكنك تغييره بناءً على المتطلبات الأمنية
        },
      },
      settings: {
        defaultFrom: env('SMTP_USER'),
        defaultReplyTo: env('SMTP_PASSWORD'),
      },
      
    },
  });
  