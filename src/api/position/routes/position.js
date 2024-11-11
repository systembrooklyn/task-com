'use strict';

/**
 * position router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::position.position');

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/positions',
      handler: 'position.create',
    },
    {
      method: 'GET',
      path: '/positions',
      handler: 'position.find',
    },
    {
      method: 'PUT',
      path: '/positions/:id',
      handler: 'position.update',
    },
    {
      method: 'DELETE',
      path: '/positions/:id',
      handler: 'position.delete',
    },
  ],
};
