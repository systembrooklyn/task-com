'use strict';

/**
 * start service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::start.start');
