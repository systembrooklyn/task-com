"use strict";

/**
 * department controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController('api::department.department');
module.exports = createCoreController(
  "api::department.department",
  ({ strapi }) => ({
    async find(ctx) {
      const entities = await strapi.entityService.findMany(
        "api::department.department",
        {
          ...ctx.query,
          populate: ["employees"],
        }
      );
      return { data: entities };
    },
    async create(ctx) {
      try {
        const { departmentName, employeeIds, companyID } = ctx.request.body.data;

        if (!departmentName) {
          return ctx.badRequest("Department name is required.");
        }

        const createdDepartment = await strapi.entityService.create(
          "api::department.department",
          {
            data: {
              departmentName,
              companyID,
              employees: employeeIds,
            },
          }
        );

        return { data: createdDepartment };
      } catch (error) {
        console.error("Error creating department:", error);
        ctx.throw(500, "An error occurred while creating the department");
      }
    },
    async update(ctx) {
      const { id } = ctx.params;
      const { departmentName, employeeIds } = ctx.request.body.data;

      const updatedDepartment = await strapi.entityService.update(
        "api::department.department",
        id,
        {
          data: {
            departmentName,

            employees: employeeIds,
          },
        }
      );

      return {
        data: updatedDepartment,
        message: "Department updated successfully",
      };
    },
    async delete(ctx) {
      const { id } = ctx.params;
      await strapi.entityService.delete("api::department.department", id);
      return { message: "Department deleted successfully" };
    },
  })
);
