'use strict';

/**
 * project controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController("api::project.project", ({ strapi }) => ({
  // ... existing code ...
  async find(ctx) {
    const entities = await strapi.entityService.findMany(
      "api::project.project",
      {
        ...ctx.query,
          populate: {
            employees: {
              populate: {
                position: true, // جلب بيانات المناصب المرتبطة بكل موظف
              },
            },
          },
      }
    );
    return { data: entities };
  },

  async create(ctx) {
    try {
      const { neme, employeeIds, createdOwner, companyID } = ctx.request.body.data;

      if (!neme) {
        return ctx.badRequest("project name is required.");
      }

      const createdProject = await strapi.entityService.create(
        "api::project.project",
        {
          data: {
            neme,
            createdOwner,
            companyID,
            employees: employeeIds,
          },
        }
      );

      const populatedProject = await strapi.entityService.findOne(
        "api::department.department",
        createdProject.id,
        {
          populate: {
            employees: {
              populate: {
                position: true,
              },
            },
          },
        }
      );

      return { data: populatedProject };
    } catch (error) {
      console.error("Error creating department:", error);
      ctx.throw(500, "An error occurred while creating the department");
    }
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { data } = ctx.request.body;
    const updatedProject = await strapi.entityService.update(
      "api::project.project",
      id,
      {
        data: data,
      }
    );
    return { message: "Project updated successfully", data: updatedProject };
  },

  async delete(ctx) {
    const { id } = ctx.params;
    const deletedProject = await strapi.entityService.delete(
      "api::project.project",
      id
    );
    return { message: "Project deleted successfully", data: deletedProject };
  },
}));
