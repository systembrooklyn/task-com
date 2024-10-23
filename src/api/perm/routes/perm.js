'use strict';

/**
 * perm router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::perm.perm');

module.exports = {
  routes: [
      {
        "method": "GET",
        "path": "/perms",
        "handler": "perm.find",
        "config": {
          "policies": []
        }
      },
      {
        "method": "POST",
        "path": "/perms",
        "handler": "perm.create",
        "config": {
          "policies": []
        }
      },
    ],
};
