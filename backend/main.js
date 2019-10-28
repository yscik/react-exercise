
import express from 'express';
import endpoints from './api.js';
import {initDb} from './db.js';

function startApp() {
  const app = express();
  const apiRoutes = express.Router();
  app.use('/api', apiRoutes);

  for(let [url, handlers] of Object.entries(endpoints)) {
    apiRoutes.use(url, handlers)
  }

  app.listen(8066, () => console.log(`Ready`))
}

(async function() {
  await initDb();
  startApp();
})();
