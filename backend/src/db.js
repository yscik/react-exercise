import pg from 'pg';
import {promises as fs} from 'fs';
import path from 'path';
import {env} from 'process';
let client;

export async function createDbClient() {
  client = new pg.Client({
    connectionString: env.DATABASE_URL || "postgres:postgres@localhost/postgres",
  });
  await client.connect()
}

export async function initDb() {
  await createDbClient();
  await executeMigrations();
}

export async function query(sql, params = []) {
  console.log('[SQL]', sql, params);
  return client.query(sql, params)
}

export async function querySingle(sql, params = []) {
  const {rowCount,rows} = await query(sql, params);
  return rowCount ? rows[0] : null;
}

async function executeMigrations()
{
  const scriptsDir = './src/migrations';
  const files = await fs.readdir(scriptsDir);
  const scripts = files.map(filename => ({
    id: +filename.slice(0, filename.indexOf('-')),
    filename: `${scriptsDir}/${filename}`,
    type: filename.slice(filename.lastIndexOf('.')+1)
  }));
  scripts.sort((a,b) => a.id - b.id);

  const version = await getVersion();
  console.log('[DB] At version', version);

  let pendingScripts = scripts.filter(s => s.id > version);

  for(let script of pendingScripts) {
    await executeMigration(script);
  }

}

async function executeMigration(script)
{
  switch(script.type) {
    case 'js':
      const scriptFn = await import(script.filename);
      await scriptFn.default();
      break;
    case 'sql':
      const sql = await fs.readFile(script.filename, {encoding: 'utf8'});
      await query(sql);
      break;
  }

  await setVersion(script.id);
}

async function getVersion() {
  const {rowCount: dbExists} = await query(`
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = current_schema()
    AND table_name = 'app'
  `);

  if (!dbExists)
    return 0;

  const {value} = await querySingle(`
    SELECT value from app WHERE key = 'version'
  `);

  return +value;
}

async function setVersion(version) {
  return query(`
    UPDATE app SET value = $1 WHERE key = 'version'
  `, [version]);
}


