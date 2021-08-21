'use strict';

module.exports = app => {
  const { io } = app;

  io.of('/').route('default', app.io.controllers.default);
};
