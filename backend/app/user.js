import bcrypt from 'bcrypt';
import {query, querySingle} from "../db.js";
import jwt from 'jsonwebtoken';
import {promisify} from 'util';
import uuidv4 from 'uuid/v4.js';

const sign = promisify(jwt.sign);

export default {
  async createUser({username, password}) {

    const id = uuidv4();
    password = await bcrypt.hash(password, 10);

    await query(`INSERT INTO "user"(id,username,password) VALUES($1, $2, $3)`, [id,username, password]);
    await query(`INSERT INTO "userdata"(userid,cities) VALUES($1, $2)`, [id,JSON.stringify([])]);

    return id;
  },
  async loginUser({username, password}) {

    const user = await querySingle(`SELECT * FROM "user" WHERE username = $1`, [username]);
    if(!user)
      return {error: 'Invalid credentials'};

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid)
      return {error: 'Invalid credentials'};

    const token = await sign({userid: user.id, username}, 'Aehaeng9vooZe5iucai8ohY5shae2hif');

    return {token};

  },
  async getUserDetails({userid}) {

    const userdata = await querySingle(`SELECT * FROM "userdata" WHERE userid = $1`, [userid]);
    return {cities: userdata.cities}
  },

  async addUserCity({user, city})
  {
    if(!city)
      throw "Invalid city";

    await query(`UPDATE "userdata" SET cities = cities::jsonb || $2::jsonb WHERE userid = $1`, [user.userid, JSON.stringify([city])]);
  }
}