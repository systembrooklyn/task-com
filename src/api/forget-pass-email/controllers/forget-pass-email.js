'use strict';

/**
 * forget-pass-email controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController("api::forget-pass-email.forget-pass-email", ({ strapi }) => ({

    async create(ctx) {
        const { data } = ctx.request.body; // الوصول إلى البيانات المرسلة في الطلب

        console.log(data);
    
        if (!data) {
          return ctx.badRequest("Data is required.");
        }
    
        const entity = await strapi.entityService.create("api::forget-pass-email.forget-pass-email", {
          data: data,
        });
        
        return ctx.send({ data: entity });
      },
}));

