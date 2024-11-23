"use strict";

/**
 * perm controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::perm.perm", ({ strapi }) => ({
  // إنشاء صلاحيات جديدة
  async create(ctx) {
    const { data } = ctx.request.body;

    try {
      // إنشاء كائن جديد للصلاحيات بناءً على البيانات المستلمة
      const newPerm = await strapi.entityService.create("api::perm.perm", {
        data: {
          canAddUser: data.canAddUser || false,
          canEditUser: data.canEditUser || false,
          canDeleteUser: data.canDeleteUser || false,
          canAddDepartment: data.canAddDepartment || false,
          canEditDepartment: data.canEditDepartment || false,
          canDeleteDepartment: data.canDeleteDepartment || false,
          canAddProject: data.canAddProject || false,
          canEditProject: data.canEditProject || false,
          canDeleteProject: data.canDeleteProject || false,
        },
      });

      // إرجاع البيانات المحفوظة مع الـ ID الخاص بها
      ctx.send({
        id: newPerm.id,
        message: "Permissions added successfully",
        // جلب الصلاحيات المرتبطة
        permissions: newPerm,
      });
    } catch (error) {
      ctx.throw(400, "Error creating permissions");
    }
  },

  // جلب جميع الصلاحيات
  async find(ctx) {
    try {
      const perms = await strapi.entityService.findMany("api::perm.perm", {
        populate: ["rols"], // إذا كنت ترغب في جلب الحقول المرتبطة بـ rols
      });

      ctx.send({
        data: perms,
        message: "Permissions found successfully",
      });
    } catch (error) {
      ctx.throw(400, "Error fetching permissions");
    }
  },
}));
