'use strict';

/**
 * position controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController("api::position.position", ({ strapi }) => ({
  async find(ctx) {
    const entities = await strapi.entityService.findMany("api::position.position", {
      ...ctx.query,
      populate: '*',
    });
    return { data: entities };
  },
  async create(ctx) {
    try {
      const { name, departmentIds , companyID } = ctx.request.body.data;

      if (!name) {
        return ctx.badRequest("Position name is required.");
      }

      const createdPosition = await strapi.entityService.create(
        "api::position.position",
        {
          data: {
            name,
            companyID,
            departments: departmentIds,
          },
        }
      );

      return { data: createdPosition, message: "Position created successfully" };
    } catch (error) {
      console.error("Error creating position:", error);
      ctx.throw(500, "An error occurred while creating the position");
    }
  },
  async update(ctx) {
    const { id } = ctx.params;
    const { name, departmentIds } = ctx.request.body.data;

    const updatedPosition = await strapi.entityService.update("api::position.position", id, {
      data: {
        name,
        departments: departmentIds,
      },
    });

    return {
      data: updatedPosition,
      message: "Position updated successfully",
    };
  },
  async delete(ctx) {
    const { id } = ctx.params;
    await strapi.entityService.delete("api::position.position", id);
    return { message: "Position deleted successfully" };
  },
}));



