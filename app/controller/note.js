// 'use strict';

// const Controller = require('egg').Controller;
// const { saveNote, saveNotes, addNote, getNoteVersion, getNotes, setNoteVersion } = require('../utils/noteManage');

// class NoteController extends Controller {
//   get socket() {
//     const { app } = this;
//     const socket = app.io.of('/');
//     return socket;
//   }

//   version() {
//     const { ctx } = this;
//     ctx.body = JSON.stringify({
//       version: getNoteVersion(),
//     });
//   }

//   addNote() {
//     const { ctx, app } = this;

//     const socket = app.io.of('/');
//     socket.emit('update');

//     const { data, version } = ctx.request.body;
//     addNote(data);
//     setNoteVersion(version);
//     this.ctx.status = 200;
//   }

//   getNotes() {
//     const { ctx } = this;
//     const noteList = getNotes();
//     ctx.body = JSON.stringify({
//       data: noteList,
//     });
//   }

//   setNotes() {
//     const { ctx, app } = this;

//     const socket = app.io.of('/');
//     socket.emit('update');

//     const { data, version } = ctx.request.body;
//     saveNotes(data);
//     setNoteVersion(version);
//     this.ctx.status = 200;
//   }

//   setNote() {
//     const { ctx, app } = this;

//     const socket = app.io.of('/');
//     socket.emit('update');

//     const { index } = ctx.params;
//     const { data, version } = ctx.request.body;
//     saveNote(data, index);
//     setNoteVersion(version);
//     this.ctx.status = 200;
//   }

//   delNote() {
//     const { ctx, app } = this;

//     const socket = app.io.of('/');
//     socket.emit('update');

//     const { index, version } = ctx.request.body;
//     saveNote(index);
//     setNoteVersion(version);
//     this.ctx.status = 200;
//   }
// }

// module.exports = NoteController;
