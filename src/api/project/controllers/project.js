'use strict';

/**
 * project controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::project.project', ({ strapi }) => ({
    // ... existing code ...

    async create(ctx) {
        // Custom create logic
        const { body } = ctx.request;
        const entity = await strapi.service('api::project.project').create({ data: body });
        return this.transformResponse(entity);
    },

    async find(ctx) {
        // Custom find logic
        const entities = await strapi.service('api::project.project').find(ctx.query);
        return this.transformResponse(entities);
    },

    async findOne(ctx) {
        // Custom findOne logic
        const { id } = ctx.params;
        const entity = await strapi.service('api::project.project').findOne(id);
        return this.transformResponse(entity);
    },

    async update(ctx) {
        // Custom update logic
        const { id } = ctx.params;
        const { body } = ctx.request;
        const entity = await strapi.service('api::project.project').update(id, { data: body });
        return this.transformResponse(entity);
    },

    async delete(ctx) {
        // Custom delete logic
        const { id } = ctx.params;
        const entity = await strapi.service('api::project.project').delete(id);
        return this.transformResponse(entity);
    },

    // ... existing code ...
}));
