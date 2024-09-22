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
        method: 'POST',
        path: '/starts/check-credentials', // المسار الجديد للتحقق من بيانات تسجيل الدخول
        handler: 'start.checkCredentials', // الوظيفة للتحقق من البريد الإلكتروني وكلمة المرور
        config: {
          auth: false, // لا حاجة للتوثيق في التحقق من تسجيل الدخول
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
  
