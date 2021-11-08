const {
  addUserConnected,
  sendMessageFromAllUsers,
  sendUserNickName,
  sendNickNameListFromAllUsers,
  removeUserDisconnected,
  updateNickName,
 } = require('./socketServices');

/* QUANDO UM USUÁIRO É CONECTADO */
module.exports = (io) => io.on('connection', (socket) => {
  addUserConnected(socket.id);
  sendUserNickName(socket, socket.id);
  sendNickNameListFromAllUsers(io);

  /* QUNADO O USUÁRIO MUDA O NOME DO NICK */
  socket.on('nickName', (nickName) => {
    updateNickName(socket.id, nickName);
    sendUserNickName(socket, socket.id);
    sendNickNameListFromAllUsers(io);
  });

  /* QUANDO UM USUÁRIO ENVIA UMA MENSAGEM */
  socket.on('message', ({ chatMessage, nickname }) => {
    sendMessageFromAllUsers(io, chatMessage, nickname);
  });

  /* QUANDO UM USUÁRIO É DESCONECTADO */
  socket.on('disconnect', () => {
    removeUserDisconnected(socket.id);
    sendNickNameListFromAllUsers(io);
  });
});
