
import express from 'express';
import {initDb} from './db.js';

function startApp() {
  const app = express();

  app.listen(8066, () => console.log(`Ready`))
}

(async function() {
  await initDb();
  startApp();
})();
