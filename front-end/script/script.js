const socket = window.io();

const dataTestId = 'data-testid';
const clientId = 'client';

let myNickName = '';

const countUserOnline = (usersCount) => {
  document.querySelector('.usersCount').innerText = usersCount;
};

// document.querySelector('.messageInput').style.width='500px'

const textAreaShape = () => {
  const inputMessage = getDocumenById('messageInput');
  inputMessage.addEventListener('input', function (event) {
    const textAreaSize = inputMessage.value.length
    console.log(textAreaSize);
    if (textAreaSize > 7) { 
      inputMessage.placeholder='$';
      return inputMessage.style.width = "100%";
    }
    inputMessage.placeholder='';
    return inputMessage.style.width = `${70}px`;
  });
}

const changeColorUserNick = () => {
  const myNick = document.getElementsByClassName('liClient')[0];
  myNick.style.color = '#bd9b04';
  // document.querySelector('.nickName').placeholder = myNickName;
  document.querySelector('#btn-user').innerText = myNickName;
};

const getDocumenById = (id) => document.getElementById(id);

const ulMsgList = getDocumenById('mensagem');
const ulUserList = getDocumenById('clients');
const form = getDocumenById('form-msg');
const btnUpdateNickName = getDocumenById('btn-nickName');

const getMyNickName = (name) => {
  myNickName = name;
};

const autoScrolling = () => {
  const textArea = document.querySelector('.container-box-message');
  textArea.scrollTop = textArea.scrollHeight;
};

// Envia a mensagem para o servidor
const sendMessageToserver = ({ chatMessage, nickname }) => {
  autoScrolling();
  socket.emit('message', { chatMessage, nickname });
};

// Altera o nome do usuário
const saveNickNameinToserver = () => {
  btnUpdateNickName.addEventListener('click', (event) => {
    event.preventDefault();
    const nickName = getDocumenById('nickName').value;
    if (!nickName || nickName === '') return null;
    socket.emit('nickName', nickName);
    changeColorUserNick();
    document.querySelector('.nickName').value = '';
  });
  return null;
};

const actionSaveNickKeyEnter = () => {
  const input = document.getElementById('nickName');
  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     btnUpdateNickName.click();
    }
  });
};

// Ao clicar no botõa para enviar a mensagem
const eventSendMessage = () => {
  // const btn = document.querySelector('.btn-msg')
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputMessage = getDocumenById('messageInput').value;
    // const inputMessage = getDocumenById('textArea').value;
    if (!inputMessage || inputMessage === '') return null;
    const inputNickName = myNickName;
    const message = { chatMessage: inputMessage, nickname: inputNickName };
    getDocumenById('messageInput').value = '';
    // inputMessage.style.width = `${80}px`
    // getDocumenById('textArea').value = '';
    sendMessageToserver(message);
    autoScrolling();
    return message;
  });
};

const actionSendMsgKeyEnter = () => {
  const inputMessage = getDocumenById('messageInput');
  inputMessage.addEventListener("keyup", function(event) {
    if (event.keyCode === 13 || event.keyCode === 11) {
     event.preventDefault();
     document.querySelector('.btn-msg').click();
    }
  });
};

// Remove elementos pelo id
const removeElementById = (id) => {
  const arr = document.querySelectorAll(`#${id}`);
  arr.forEach((ele) => ele.remove());
};

// Recurar o histórico de mensagens
const historyMessages = (arr) => {
  arr.forEach((ele) => {
    const { timestamp, nickname, message } = ele;
    const li = document.createElement('li');
    li.setAttribute(dataTestId, 'message');
    li.className = 'liMessage';
    li.innerText = `${timestamp} - ${nickname}: ${message}`;
    ulMsgList.appendChild(li);
  });
  autoScrolling();
};

// Cria a mensagem no front-end
const createUserMsgLiElement = (message) => {
  const li = document.createElement('li');
  li.setAttribute(dataTestId, 'message');
  li.className = 'liMessage';
  li.innerText = message;
  ulMsgList.appendChild(li);
  autoScrolling();
};

// Atualiza a lista de clients
const updateClients = (arr) => {
  removeElementById(clientId);
  arr.forEach((ele) => {
    const li = document.createElement('li');
    li.setAttribute(dataTestId, 'online-user');
    li.id = clientId;
    li.className = 'liClient';
    li.innerText = ele;
    ulUserList.appendChild(li);
    countUserOnline(arr.length);
  });
  changeColorUserNick();
};

const activeUserList = (arr) => {
  let newList = arr;
  newList = newList.filter((ele) => ele !== myNickName);
  const me = arr.find((ele) => ele === myNickName);
  newList = [me, ...newList];
  updateClients(newList);
  return null;
};

socket.on('msgHistoric', (arr) => historyMessages(arr));
socket.on('myNick', (str) => getMyNickName(str));
socket.on('message', (str) => createUserMsgLiElement(str));
socket.on('activeClients', (arr) => activeUserList(arr));

window.onload = () => {
  eventSendMessage();
  saveNickNameinToserver();
  autoScrolling();
  actionSaveNickKeyEnter();
  textAreaShape();
  actionSendMsgKeyEnter();
};
