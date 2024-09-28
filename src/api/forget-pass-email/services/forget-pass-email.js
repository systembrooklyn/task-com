'use strict';

/**
 * forget-pass-email service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::forget-pass-email.forget-pass-email');
