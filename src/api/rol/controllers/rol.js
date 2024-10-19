'use strict';

/**
 * rol controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::rol.rol', ({ strapi }) => ({
  


  async create(ctx) {
    try {
      const { name, companyId, permissions } = ctx.request.body.data;

      if (!name || !permissions || permissions.length === 0) {
        return ctx.badRequest('Role name and permissions are required.');
      }

      // تأكد من أن permissions تحتوي على معرفات الصلاحيات الصحيحة
      const createdRole = await strapi.entityService.create('api::rol.rol', {
        data: {
          name,
          companyId,
          permissions, // تمرير معرفات الصلاحيات كعلاقة
        },
      });

      return { data: createdRole };
    } catch (error) {
      console.error("Error creating role with permissions:", error);
      ctx.throw(500, 'An error occurred while creating the role');
    }
  },


  async find(ctx) {
    try {
      // جلب جميع الأدوار باستخدام entityService وتضمين الصلاحيات
      const roles = await strapi.entityService.findMany('api::rol.rol', {
        populate: {
          permissions: true, // تضمين الصلاحيات
        },
      });
  
      return { data: roles };
    } catch (error) {
      ctx.throw(500, 'An error occurred while fetching roles');
    }
  },
  

  
}));
