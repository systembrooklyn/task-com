'use strict';

/**
 * start router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::start.start');

module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/starts/check',  // المسار للتحقق من البريد الإلكتروني
        handler: 'start.checkEmail',  // الوظيفة التي سيتم استدعاؤها
        config: {
          auth: false,  // يمكنك تفعيل أو تعطيل الصلاحيات هنا
        },
      },
      {
        "method": "GET",
        "path": "/starts",
        "handler": "start.find",
        "config": {
          "policies": []
        }
      }
    ],
  };
  
