'use strict';

/**
 * start controller
 */
const bcrypt = require('bcrypt');


const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::start.start', ({ strapi }) => ({

  // وظيفة للتحقق من البريد الإلكتروني
  async checkEmail(ctx) {
    const { email } = ctx.query;

    if (!email) {
      return ctx.badRequest('Email parameter is required.');
    }

    // التحقق مما إذا كان البريد الإلكتروني موجودًا
    const existingEmail = await strapi.db.query('api::start.start').findOne({
      where: { email: email }
    });

    if (existingEmail) {
      return ctx.send({ exists: true, message: 'البريد الإلكتروني مسجل بالفعل.' });
    }

    return ctx.send({ exists: false, message: 'البريد الإلكتروني غير مسجل.' });
  },
   // وظيفة للتحقق من البريد الإلكتروني وكلمة المرور
    // دالة التحقق من البريد الإلكتروني وكلمة المرور
    async checkCredentials(ctx) {
      const { email, password } = ctx.request.body;

  console.log(password);

    
    
      // التحقق من وجود البريد الإلكتروني وكلمة المرور
    
      if (!email || !password) {
        return ctx.badRequest('Email and password are required.');
      }
    
      // التحقق من وجود المستخدم بالبريد الإلكتروني
      const user = await strapi.db.query('api::start.start').findOne({
        where: { email: email }
      });

        // طباعة بيانات المستخدم المسترجعة من قاعدة البيانات
  console.log('User fetched from database:', user);

    
      if (!user) {
        return ctx.send({ success: false, message: 'البريد الإلكتروني غير موجود.' });
      }
    
      // التحقق من مطابقة كلمة المرور باستخدام bcrypt
      const isValidPassword = await bcrypt.compare(password, user.password);
    
      if (!isValidPassword) {
        return ctx.send({ success: false, message: 'كلمة المرور غير صحيحة.' });
      }
    
      // إزالة كلمة المرور من الاستجابة لزيادة الأمان
      delete user.password;
    
      return ctx.send({ success: true, message: 'تسجيل الدخول ناجح.', user });
    },
    

  // وظيفة لجلب البيانات (find)
  async find(ctx) {
    const entities = await strapi.entityService.findMany('api::start.start', {
      ...ctx.query,
    });

    return ctx.send({ data: entities });
  },

  // وظيفة لإنشاء بيانات جديدة (create)
  async create(ctx) {
    const { data } = ctx.request.body;  // الوصول إلى البيانات المرسلة في الطلب

    if (!data) {
      return ctx.badRequest('Data is required.');
    }

    const entity = await strapi.entityService.create('api::start.start', {
      data: data,
    });

    return ctx.send({ data: entity });
  },

  // وظيفة لتحديث البيانات (update)
  async update(ctx) {
    const { id } = ctx.params;
    const { data } = ctx.request.body;  // الوصول إلى البيانات المرسلة في الطلب

    if (!data) {
      return ctx.badRequest('Data is required.');
    }

        // تشفير كلمة المرور قبل التخزين
  const hashedPassword = await bcrypt.hash(data.password, 10); // الرقم 10 هو عدد الجولات (salt rounds)

  // تحديث البيانات مع كلمة المرور المشفرة
  data.password = hashedPassword;

    const updatedEntity = await strapi.entityService.update('api::start.start', id, {
      data: data,
    });

    return ctx.send({ data: updatedEntity });
  },

}));
