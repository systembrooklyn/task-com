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
        path: '/starts/check',  
        handler: 'start.checkEmail', 
        config: {
          auth: false,  
        },
      },
      {
        method: 'POST',
        path: '/starts/check-credentials', 
        handler: 'start.checkCredentials', 
        config: {
          auth: false, 
        },
      },
      {
        method: 'GET',
        path: '/starts/check-id',  
        handler: 'start.checkId',
        config: {
          auth: false,  
        },
      },
      {
        method: 'POST',
        path: '/starts/send-reset-password',
        handler: 'start.sendResetPassword',
        config: {
          auth: false, // المستخدم غير مطالب بتسجيل الدخول
        },
      },
      {
        "method": "GET",
        "path": "/starts",
        "handler": "start.find",
        "config": {
          "policies": []
        }
      },
      {
        "method": "POST",
        "path": "/starts",
        "handler": "start.create",
        "config": {
          "policies": []
        }
      },
      {
        "method": "PUT",
        "path": "/starts/:id",
        "handler": "start.update",
        "config": {
          "policies": []
        }
      }
    ],
  };
  
