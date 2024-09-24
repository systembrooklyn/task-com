module.exports = ({ env }) => ({
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: env('SMTP_USERNAME'),
            pass: env('SMTP_PASSWORD'),
          },
          // You can configure additional options here
        },
        settings: {
          defaultFrom: env('SMTP_USERNAME'),
          defaultReplyTo: env('SMTP_USERNAME'),
        },
      },
    },
  });
  