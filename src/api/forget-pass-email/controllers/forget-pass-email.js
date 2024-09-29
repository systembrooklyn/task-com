'use strict';

/**
 * forget-pass-email controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// تعريف دالة التشفير هنا
const encodeEmail = (email) => {
  return Buffer.from(email).toString('base64');
};

module.exports = createCoreController("api::forget-pass-email.forget-pass-email", ({ strapi }) => ({

  async create(ctx) {
    const { data } = ctx.request.body; // الوصول إلى البيانات المرسلة في الطلب

    if (!data || !data.email) {
      return ctx.badRequest("Email is required.");
    }

    // تشفير البريد الإلكتروني
    const encodedEmail = encodeEmail(data.email);
    console.log(encodedEmail);

    // استخدام البريد الإلكتروني المشفر للتخزين أو الإرسال
    data.email = encodedEmail;

    const entity = await strapi.entityService.create("api::forget-pass-email.forget-pass-email", {
      data: data,
    });

    return ctx.send({ data: entity });
  },
}));
