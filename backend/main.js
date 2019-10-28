
import express from 'express';

function startApp() {
  const app = express();

  app.listen(8066, () => console.log(`Ready`))
}

(async function() {
  startApp();
})();
