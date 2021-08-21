'use strict';

global.HASH_POOL = new Map();
global.CHAT_POOL = new Map();

const getNoticeList = hashList => {
  const noticeData = {};
  hashList.forEach(hash => {
    const userList = Array.from(global.HASH_POOL.get(hash) || []);
    userList.forEach(user => {
      if (!noticeData[user]) {
        noticeData[user] = {
          socket: global.CHAT_POOL.get(hash).get(user),
          hashList: [],
        };
      }
      noticeData[user].hashList.push(hash);
    });
  });
  return Object.values(noticeData);
};

module.exports = () => {
  return async (ctx, next) => {
    const { userId, hashList: jsonHashList = '[]' } = ctx.socket.handshake.query;
    const hashList = JSON.parse(jsonHashList) || [];

    hashList.forEach(hash => {
      if (!global.HASH_POOL.has(hash)) {
        global.HASH_POOL.set(hash, new Set());
      }
      if (!global.CHAT_POOL.has(hash)) {
        global.CHAT_POOL.set(hash, new Map());
      }
      global.HASH_POOL.get(hash).add(userId);
      global.CHAT_POOL.get(hash).set(userId, (key, data) => {
        ctx.socket.emit(key, data);
      });
    });
    ctx.socket.emit('connected', userId);

    // 通知其它用户
    getNoticeList(hashList).forEach(({ socket, hashList }) => {
      socket('user-connect', JSON.stringify({
        userId,
        hashList,
      }));
    });

    const channelMap = hashList.reduce((map, hash) => {
      const userList = Array.from(global.HASH_POOL.get(hash) || []);
      map[hash] = userList;
      return map;
    }, {});

    ctx.socket.emit('init-channel', JSON.stringify(channelMap));

    // user disconnect
    await next();

    hashList.forEach(hash => {
      global.HASH_POOL.get(hash).delete(userId);
      global.CHAT_POOL.get(hash).delete(userId);
    });

    getNoticeList(hashList).forEach(({ socket, hashList }) => {
      socket('user-disconnect', JSON.stringify({
        userId,
        hashList,
      }));
    });
  };
};
