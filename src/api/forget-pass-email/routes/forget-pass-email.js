'use strict';

/**
 * forget-pass-email router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::forget-pass-email.forget-pass-email');

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
        "path": "/forget-pass-emails",
        "handler": "forget-pass-email.create",
        "config": {
          "policies": []
        }
      },
    ],
  };
  
