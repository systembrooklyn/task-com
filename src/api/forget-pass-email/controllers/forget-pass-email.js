'use strict';

/**
 * forget-pass-email controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const crypto = require('crypto');

// إعدادات التشفير
const secretKey = 'vZ0D8X$yE6Ng^9P3r@H#w1RLvC$Sx^5M'; // استخدم مفتاح سري قوي ويُفضل وضعه في ملف .env
const algorithm = 'aes-256-cbc';

// دالة لتشفير البريد الإلكتروني
const encryptEmail = (email) => {
  const iv = crypto.randomBytes(16); // إنشاء IV عشوائي
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
  let encrypted = cipher.update(email);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

module.exports = createCoreController("api::forget-pass-email.forget-pass-email", ({ strapi }) => ({

  async create(ctx) {
    const { data } = ctx.request.body; // الوصول إلى البيانات المرسلة في الطلب

    if (!data || !data.email) {
      return ctx.badRequest("Email is required.");
    }

    // تشفير البريد الإلكتروني
    const encryptedEmail = encryptEmail(data.email);

    // استخدام البريد الإلكتروني المشفر للتخزين أو الإرسال
    data.email = encryptedEmail;

    const entity = await strapi.entityService.create("api::forget-pass-email.forget-pass-email", {
      data: data,
    });

    return ctx.send({ data: entity });
  },
}));
