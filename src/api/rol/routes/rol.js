'use strict';

/**
 * rol router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::rol.rol', {
  config: {
    find: {
      policies: [],
      middlewares: [],
    },
    create: {
      policies: [],
      middlewares: [],
    },
    update: {
      policies: [],
      middlewares: [],
    },
    delete: {
      policies: [],
      middlewares: [],
    },
  },
});
