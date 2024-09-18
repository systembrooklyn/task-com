'use strict';

/**
 * start controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::start.start');
