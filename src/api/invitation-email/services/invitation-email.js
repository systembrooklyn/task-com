'use strict';

/**
 * invitation-email service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::invitation-email.invitation-email');
