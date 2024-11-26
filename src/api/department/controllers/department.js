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
          },
        }
      );
      return { data: entities };
    },

    async create(ctx) {
      try {
        const { departmentName, employeeIds, positionIds, companyID } = ctx.request.body.data;

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
              positions: positionIds,
            },
          }
        );

        // const populatedDepartment = await strapi.entityService.findOne(
        //   "api::department.department",
        //   createdDepartment.id,
        //   {
        //     populate: {
        //       employees: {
        //         populate: {
        //           position: true,
        //         },
        //       },
        //     },
        //   }
        // );

        return { data: createdDepartment, message: "Department created successfully" };
      } catch (error) {
        console.error("Error creating department:", error);
        ctx.throw(500, "An error occurred while creating the department");
      }
    },
    async update(ctx) {
      const { id } = ctx.params;
      const { departmentName, positionIds, employeeIds } = ctx.request.body.data;

      console.log("departmentName : " + departmentName + " employeeIds : " + employeeIds + " positionIds : " + positionIds);

      // const updatedData = {
      //   departmentName: data.departmentName,
      //   employees: data.employees,
      // };

      const updatedDepartment = await strapi.entityService.update(
        "api::department.department",
        id,
        {
          data: {
            departmentName,
            employees: employeeIds,
            positions: positionIds,
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
