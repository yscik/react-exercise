import bodyParser from "body-parser";
import jwt from "express-jwt";

export const withAuth = [
  jwt({secret: 'Aehaeng9vooZe5iucai8ohY5shae2hif'}),
  unauthorized,
];

export const withBody = bodyParser.json();

export function appCall(args, appFn) {

  return async (req, res) => {
    console.log('[API]', appFn);
    try {
      res.json(await appFn(args(req)))
    }
    catch(error) {
      console.error(error)
      res.status(400).json({error})
    }
  }
}

function unauthorized(err,req,res,next)
{
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(null);
  }
}