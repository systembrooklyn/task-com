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
  const { data } = ctx.request.body; // جلب البيانات المرسلة من الـ Frontend

  try {
    // التكرار عبر العمليات المختلفة في البيانات
    for (const item of data) {
      if (item.action === "updateDepartment") {
        // تحديث القسم
        const updatedEmployees = item.employees.map((employee) => {
          if (employee.position.name === "Manager" && item.managerId) {
            employee.id = item.managerId;
          } else if (
            employee.position.name === "Vice Manager" &&
            item.viceManagerId
          ) {
            employee.id = item.viceManagerId;
          }
          return employee;
        });

        // تحديث بيانات القسم مع الموظفين المحدثين
        const updatedDepartment = await strapi.entityService.update(
          "api::department.department", // التأكد من أن هذا هو الكائن الصحيح للقسم
          item.departmentId,
          {
            data: {
              departmentName: item.departmentName, // اسم القسم
              employees: updatedEmployees, // الموظفين المحدثين
            },
          }
        );

        console.log("Updated Department:", updatedDepartment);
      }
    }

    // إرسال استجابة نجاح بعد تنفيذ العمليات
    return ctx.send({
      success: true,
      message: "Operations completed successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error executing operations:", error);
    return ctx.throw(
      500,
      "An error occurred while executing the operations"
    );
  }
},

    async delete(ctx) {
      const { id } = ctx.params;
      await strapi.entityService.delete("api::department.department", id);
      return ctx.send({ message: "Department deleted successfully" });
    },
  })
);
