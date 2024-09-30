'use strict';

/**
 * invitation-email controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController("api::invitation-email.invitation-email", ({ strapi }) => ({

    async create(ctx) {
        const { data } = ctx.request.body; // الوصول إلى البيانات المرسلة في الطلب

        console.log(data);
    
        if (!data) {
          return ctx.badRequest("Data is required.");
        }
    
        const entity = await strapi.entityService.create("api::invitation-email.invitation-email", {
          data: data,
        });
        
        return ctx.send({ data: entity });
      },
}));
