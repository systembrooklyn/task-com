module.exports = ({ env }) => ({
  email: {
    provider: 'smtp',
    providerOptions: {
      host: env('SMTP_HOST', 'mail.brooklynacademy.net'), // خادم SMTP الخاص بنطاقك
      port: env('SMTP_PORT', 465), // المنفذ 465 لـ SSL
      secure: true, // استخدام SSL
      auth: {
        user: env('SMTP_USERNAME', 'mytask@brooklynacademy.net'), // بريدك الإلكتروني
        pass: env('SMTP_PASSWORD', 'U6}RqMX[,4gF'), // كلمة المرور الخاصة ببريدك الإلكتروني
      },
    },
    settings: {
      defaultFrom: 'mytask@brooklynacademy.net', // البريد الإلكتروني الافتراضي للإرسال
      defaultReplyTo: 'mytask@brooklynacademy.net', // البريد الإلكتروني الافتراضي للرد
    },
  },
});
