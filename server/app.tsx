import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import { runConversation } from './conversation';

import { renderToString } from 'react-dom/server';
import {HomePage} from './pages/HomePage';
import {ChatPage} from './pages/ChatPage';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/', async (req, res, next) => {
  res.send(renderToString(HomePage()));
  next();
});

app.get('/chat', async (req, res, next) => {
  res.send(renderToString(ChatPage()));
  next();
});

app.post('/api/traps', async (req, res, next) => {
  const traps = await runConversation(req.body.message);
  res.send({
    traps,
  });
  next();
});

app.listen(3099, () => {
  console.log("Listening on 3099");
});