'use strict';

const Controller = require('egg').Controller;

class SocketController extends Controller {
  get socket() {
    const { app } = this;
    const socket = app.io.of('/');
    return socket;
  }
}

module.exports = SocketController;
