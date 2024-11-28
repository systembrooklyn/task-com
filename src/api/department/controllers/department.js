"use strict";

/**
 * department controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::department.department",
  ({ strapi }) => ({
    async find(ctx) {
      const entities = await strapi.entityService.findMany(
        "api::department.department",
        {
          ...ctx.query,
          populate: {
            employees: {
              populate: {
                position: true, // جلب بيانات المناصب المرتبطة بكل موظف
              },
            },
            position: {
              populate: "*",
            },
          },
        }
      );
      return ctx.send({ data: entities });
    },

    async create(ctx) {
      try {
        const { departmentName, employeeIds, companyId } =
          ctx.request.body.data;

        if (!departmentName) {
          return ctx.badRequest("Department name is required.");
        }

        const createdDepartment = await strapi.entityService.create(
          "api::department.department",
          {
            data: {
              departmentName,
              companyId,
              employees: employeeIds,
            },
          }
        );

        const populatedDepartment = await strapi.entityService.findOne(
          "api::department.department",
          createdDepartment.id,
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

        return ctx.send({ data: populatedDepartment });
      } catch (error) {
        console.error("Error creating department:", error);
        ctx.throw(500, "An error occurred while creating the department");
      }
    },
    async update(ctx) {
      const { id } = ctx.params;
      const { data } = ctx.request.body;

      console.log(data);
        const manager = await data.employees.find((employee) => employee.position === "Manager")
        const viceManager = await data.employees.find((employee) => employee.position === "Vice Manager")

      console.log("manager : " + manager, "viceManager :", viceManager)
      const updatedData = {
        departmentName: data.departmentName,
        managerId: manager ? manager.id : null,
        viceManagerId: viceManager ? viceManager.id : null
      };

      const updatedDepartment = await strapi.entityService.update(
        "api::department.department",
        id,
        {
          data: updatedData,
        }
      );

      return ctx.send({
        success: true,
        data: updatedDepartment,
        message: "Department updated successfully",
      });
    },
    async delete(ctx) {
      const { id } = ctx.params;
      await strapi.entityService.delete("api::department.department", id);
      return ctx.send({ message: "Department deleted successfully" });
    },
  })
);
