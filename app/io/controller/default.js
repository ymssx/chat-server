'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
  async message() {
    const { ctx } = this;
    await ctx.socket.emit('message');
  }
}

module.exports = DefaultController;
