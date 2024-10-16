'use strict';

/**
 * rol controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::rol.rol', ({ strapi }) => ({
  async find(ctx) {
    try {
      // جلب جميع الأدوار باستخدام entityService
      const roles = await strapi.entityService.findMany('api::rol.rol', {
        fields: ['id', 'name'], // تحديد الحقول التي تريد استرجاعها
        populate: {
          permissions: {
            populate: ['permissions'],
          },
        },
      });

      return { data: roles };
    } catch (error) {
      ctx.throw(500, 'An error occurred while fetching roles');
    }
  }
}));
