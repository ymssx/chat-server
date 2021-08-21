'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/chat/sessions/', controller.chat.getSessions);
  router.post('/api/message/send/', controller.chat.sendMessage);
};
