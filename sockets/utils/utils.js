const { dateConvertBrasilAMPM } = require('./dateService.js');

let activeUsers = [];

// Cria o nick aleatório através do socket.id
const nickGenerator = (str) => str.substring(0, 16);

// Cria um objeto de usuário contendo o id do socket.id e o nome;
const createObjUser = (socketId) => {
  const obj = { id: socketId, name: nickGenerator(socketId) };
  return obj;
};

// Adiciona novos usuários pelo socket.id
const addUserConnected = (socketId) => {
  const newList = [...activeUsers, createObjUser(socketId)];
  activeUsers = newList;
  return newList;
};

// Remove usuários pelo socket.id
const removeUserDisconnected = (socketId) => {
  const newList = activeUsers.filter((ele) => 
    ele.id.toString() !== socketId.toString());
    activeUsers = newList;
  return newList; 
};

// Recupera o nickName da lista de usuários conectados e envia ao front-end
const sendUserNickName = (socket, sockedId) => {
  const nickName = activeUsers.find((ele) => ele.id === sockedId);
  socket.emit('myNick', nickName.name);
  return nickName.name;
};

const sendNickNameListFromAllUsers = (io) => {
  const nickNameList = activeUsers.map((ele) => ele.name);
  io.emit('activeClients', nickNameList);
};

// Atualiza o nickname na lista de usuários ativos
const updateNickName = (socketId, nickName) => {
  const newList = activeUsers.map((ele) => {
    if (ele.id === socketId) {
      const newObject = { ...ele, name: nickName }; // Método não mutável
      return newObject;
    }
    return ele;
  });
  activeUsers = newList;
  return newList;
};

// Cria a mensagem no front-end
const sendMessageFromAllUsers = (io, userMsg, nickName) => {
  const timestamp = dateConvertBrasilAMPM();
  const msg = `${timestamp} - ${nickName}: ${userMsg}`;
  io.emit('message', msg);
 return msg;
};

module.exports = {
  addUserConnected,
  sendMessageFromAllUsers,
  sendUserNickName,
  sendNickNameListFromAllUsers,
  removeUserDisconnected,
  updateNickName,
 };
