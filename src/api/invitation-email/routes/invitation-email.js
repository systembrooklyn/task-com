'use strict';

/**
 * invitation-email router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::invitation-email.invitation-email');

module.exports = {
    routes: [
    //   {
    //     "method": "GET",
    //     "path": "/starts",
    //     "handler": "start.find",
    //     "config": {
    //       "policies": []
    //     }
    //   },
      {
        "method": "POST",
        "path": "/invitation-emails",
        "handler": "invitation-email.create",
        "config": {
          "policies": []
        }
      },
    ],
  };
  
