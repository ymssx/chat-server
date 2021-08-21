'use strict';

const Controller = require('../utils/controller');

class ChatController extends Controller {
  getSessions() {
    const { ctx } = this;
    const sessions = [
      {
        id: 'asdwqe1',
        name: 'XMG',
        members: [ 'ewqeqw', 'sadas' ],
        lastTime: '1996-12-32',
        lastMessage: 'test message',
      },
      {
        id: 'asdwqsdae1',
        name: 'Robot',
        members: [ 'ewqeqw', 'dqwe' ],
        lastTime: '2026-12-32',
        lastMessage: 'test message2',
      },
      {
        id: 'asdwqda1e1',
        name: 'SELF',
        members: [ 'ewqeqw', 'ewqeqw' ],
        lastTime: '2026-12-32',
        lastMessage: 'test message3',
      },
    ];
    ctx.body = JSON.stringify({
      data: sessions,
    });
  }

  sendMessage() {
    const { ctx } = this;
    const { id, sessionId, originId, content, hash } = ctx.request.body;
    global.CHAT_POOL.get(hash).get(sessionId).socket('message', JSON.stringify({
      id, sessionId: originId, originId, content, hash, time: new Date().getTime(),
    }));
    this.ctx.status = 200;
  }
}

module.exports = ChatController;
