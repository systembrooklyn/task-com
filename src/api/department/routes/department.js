'use strict';

/**
 * department router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::department.department');

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/departments',
      handler: 'department.create',
    },
    {
      method: 'GET',
      path: '/departments',
      handler: 'department.find',
    },
    {
      method: 'PUT',
      path: '/departments/:id',
      handler: 'department.update',
    },
    {
      method: 'DELETE',
      path: '/departments/:id',
      handler: 'department.delete',
    },
  ],
};
