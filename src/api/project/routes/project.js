'use strict';

/**
 * project router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::project.project');

module.exports = {
    routes: [
      {
        "method": "GET",
        "path": "/projects",
        "handler": "project.find",
        "config": {
          "policies": []
        }
      },
      {
        "method": "POST",
        "path": "/projects",
        "handler": "project.create",
        "config": {
          "policies": []
        }
      },
      {
        "method": "PUT",
        "path": "/projects/:id",
        "handler": "project.update",
        "config": {
          "policies": []
        }
      },
      {
        "method": "DELETE",
        "path": "/projects/:id",
        "handler": "project.delete",
        "config": {
          "policies": []
        }
      },
    ],
  };
