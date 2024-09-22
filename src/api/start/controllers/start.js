'use strict';

/**
 * start controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::start.start', ({ strapi }) => ({
  
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
}));
