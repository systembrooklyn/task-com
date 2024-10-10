'use strict';

/**
 * perm service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::perm.perm');
