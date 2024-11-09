'use strict';

/**
 * department controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::department.department');
module.exports = createCoreController("api::department.department", ({ strapi }) => ({
  async find(ctx) {
    const entities = await strapi.entityService.findMany("api::department.department", {
      ...ctx.query,
      populate: ['employees'],
    });
    return { data: entities };
  },
  async create(ctx) {
    try {
      const { departmentName, employeeIds } = ctx.request.body.data;

      if (!departmentName) {
        return ctx.badRequest('Department name is required.');
      }

      const createdDepartment = await strapi.entityService.create('api::department.department', {
        data: {
          departmentName,
          employees: employeeIds,
        },
      });

      return { data: createdDepartment };
    } catch (error) {
      console.error("Error creating department:", error);
      ctx.throw(500, 'An error occurred while creating the department');
    }
  },
}));
