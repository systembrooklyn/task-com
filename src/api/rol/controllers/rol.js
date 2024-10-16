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
  },


  async create(ctx) {
    try {
      // استلام البيانات من الطلب
      const { name, companyId, permissions } = ctx.request.body.data;
  
      // تحقق من أن الحقول المطلوبة موجودة
      if (!name || !permissions || permissions.length === 0) {
        return ctx.badRequest('Role name and permissions are required.');
      }
  
      // تحويل مصفوفة الصلاحيات إلى كائن
      const permissionsObject = permissions.reduce((acc, permission) => {
        acc[permission.permissionName] = permission.value;
        return acc;
      }, {});
  
      // إنشاء الدور الجديد باستخدام entityService
      const createdRole = await strapi.entityService.create('api::rol.rol', {
        data: {
          name,
          companyId, // يمكن أن يكون null إذا لم يكن companyId موجودًا
          permissions: permissionsObject, // إرسال الصلاحيات ككائن
        },
      });
  
      // إعادة الرد بنجاح مع البيانات التي تم إنشاؤها
      return { data: createdRole };
    } catch (error) {
      console.error("Error creating role with permissions:", error);
      ctx.throw(500, 'An error occurred while creating the role');
    }
  }
  
}));
