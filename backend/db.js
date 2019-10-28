import pg from 'pg';

let client;

export async function createDbClient() {
  client = new pg.Client({
    user: 'postgres',
    database: 'postgres'
  });
  await client.connect()
}

export async function initDb() {
  await createDbClient();
}

export async function query(sql, params = []) {
  console.log('[SQL]', sql, params);
  return client.query(sql, params)
}

export async function querySingle(sql, params = []) {
  const {rowCount,rows} = await query(sql, params);
  return rowCount ? rows[0] : null;
}
