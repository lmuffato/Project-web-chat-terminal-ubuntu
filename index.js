const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config();
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/test', (req, res) => res.status(200).json({ message: 'mensagem de teste' }));

const io = require('socket.io')(http, {
  cors: {
    orgin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.static(path.join(__dirname, '/front-end')));

require('./back-end/socketControllers')(io);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/front-end/chat.html'));
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});