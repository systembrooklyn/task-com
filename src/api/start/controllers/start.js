'use strict';

/**
 * start controller
 */

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

    const updatedEntity = await strapi.entityService.update('api::start.start', id, {
      data: data,
    });

    return ctx.send({ data: updatedEntity });
  },

}));
