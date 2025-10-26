import express from 'express';
import { config } from './configs/env.js';

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
} );

app.listen(config.port, config.host, () => {
  console.log(`[ ready ] http://${config.host}:${config.port}`);
});
