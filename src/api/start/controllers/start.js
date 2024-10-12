"use strict";
/**
 * start controller
 */
const bcrypt = require("bcrypt");
const { ids } = require("googleapis/build/src/apis/ids");
const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController("api::start.start", ({ strapi }) => ({
  // وظيفة للتحقق من البريد الإلكتروني
  async checkEmail(ctx) {
    const { email } = ctx.query;
    if (!email) {
      return ctx.badRequest("Email parameter is required.");
    }
    // التحقق مما إذا كان البريد الإلكتروني موجودًا
    const existingEmail = await strapi.db.query("api::start.start").findOne({
      where: { email: email },
    });
    if (existingEmail) {
      return ctx.send({
        exists: true,
        message: "البريد الإلكتروني مسجل بالفعل.",
        ids: existingEmail.id,
      });
    }
    return ctx.send({ exists: false, message: "البريد الإلكتروني غير مسجل." });
  },
  async checkId(ctx) {
    const { id } = ctx.query;
    if (!id) {
      return ctx.badRequest("Id parameter is required.");
    }
    // التحقق مما إذا كان البريد الإلكتروني موجودًا
    const existingEmail = await strapi.db.query("api::start.start").findOne({
      where: { id: id },
    });
    if (existingEmail) {
      return ctx.send({
        exists: true,
        message: " البريد الإلكتروني مسجل بالفعل.",
      });
    }
    return ctx.send({ exists: false, message: "البريد الإلكتروني غير مسجل." });
  },
  // وظيفة للتحقق من البريد الإلكتروني وكلمة المرور
  // دالة التحقق من البريد الإلكتروني وكلمة المرور
  async checkCredentials(ctx) {
    const { email, password } = ctx.request.body;

    if (!email || !password) {
      return ctx.badRequest('Email and password are required.');
    }

    const user = await strapi.db.query('api::start.start').findOne({
      where: { email: email },
    });

    if (!user) {
      return ctx.send({ success: false, message: 'البريد الإلكتروني غير موجود.' });
    }

    // مقارنة كلمة المرور مباشرة (غير موصى به)
    if (password !== user.password) {
      return ctx.send({ success: false, message: 'كلمة المرور غير صحيحة.' });
    }

    delete user.password;

    return ctx.send({ success: true, message: 'تسجيل الدخول ناجح.', user });
  },


  // وظيفة لجلب البيانات (find)
  async find(ctx) {
    const entities = await strapi.entityService.findMany("api::start.start", {
      ...ctx.query,
    });

    return ctx.send({ data: entities });
  },

  // وظيفة لإنشاء بيانات جديدة (create)
  async create(ctx) {
    const { data } = ctx.request.body; // الوصول إلى البيانات المرسلة في الطلب
    console.log(data);
    if (!data) {
      return ctx.badRequest("Data is required.");
    }

    const entity = await strapi.entityService.create("api::start.start", {
      data: data,
    });

    return ctx.send({ data: entity });
  },
  // وظيفة لتحديث البيانات (update)
  async update(ctx) {
    const { id } = ctx.params;
    const { data } = ctx.request.body; // الوصول إلى البيانات المرسلة في الطلب
    console.log(data);
    if (!data) {
      return ctx.badRequest("Data is required.");
    }
    const updatedEntity = await strapi.entityService.update(
      "api::start.start",
      id,
      {
        data: data,
      }
    );

    // إزالة كلمة المرور من الاستجابة لزيادة الأمان
    if (updatedEntity.password) {
      delete updatedEntity.password;
    }
    return ctx.send({success: true, message: 'تم التحديث بنجاح', data: updatedEntity });
  },
  async sendResetPassword(ctx) {
    const { email } = ctx.request.body;
    console.log("email : " + email);
    // التحقق من وجود البريد الإلكتروني
    if (!email) {
      return ctx.badRequest('Email is required.');
    }
    // البحث عن المستخدم بالبريد الإلكتروني
    const user = await strapi.db.query('api::start.start').findOne({
      where: { email:email },
    });
    if (!user) {
      return ctx.send({ success: false, message: 'Email not found.' });
    }
    // إنشاء رابط إعادة تعيين كلمة المرور
    const resetPasswordLink = `https://task-com.onrender.com/reset-password?email=${email}`;
    console.log("resetPasswordLink : " + resetPasswordLink)
    // إرسال البريد الإلكتروني مع الرابط
    try {
      await strapi.plugins['email'].services.email.send({
        to: user.email,
        subject: 'Reset Your Password',
        text: `Please reset your password using the following link: ${resetPasswordLink}`,
        html: `<p>Please reset your password by clicking the link below:</p><a href="${resetPasswordLink}">Reset Password</a>`,
      });
      return ctx.send({ success: true, message: 'Reset link sent to your email.' });
    } catch (error) {
      console.error('Error sending email:', error);
      return ctx.send({ success: false, message: 'Error sending reset link.' });
    }
  },
}));