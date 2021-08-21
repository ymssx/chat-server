'use strict';

module.exports = () => {
  return async (ctx, next) => {
    global.socket = ctx.socket;
    ctx.socket.emit('connected', ctx.socket.id);
    await next();
  };
};
