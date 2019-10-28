import bodyParser from "body-parser";
import jwt from "express-jwt";

export function withAuth(appFn) {
  return [
    jwt({secret: 'Aehaeng9vooZe5iucai8ohY5shae2hif'}),
    unauthorized,
    async (req, res) => res.json(await appFn(req.user))]
}

export function withBody(appFn) {
  return [bodyParser.json(), async (req, res) =>
      res.json(await appFn(req.body))]
}

export function withParams(appFn) {
  return async (req, res) => res.json(await appFn(req.params))
}

export function withQuery(appFn) {
  return async (req, res) => res.json(await appFn(req.query))
}

function unauthorized(err,req,res,next)
{
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(null);
  }
}