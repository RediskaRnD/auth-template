import * as process from 'node:process';

import pg from 'pg';

const { Pool } = pg;

declare global {
  var pgPool: pg.Pool | undefined;
}

export const pgPool: pg.Pool | undefined = globalThis.pgPool || new Pool({
  max: 20, // maximum number of clients in the pool
  idleTimeoutMillis: 30000, // close idle clients after 30 seconds
  connectionTimeoutMillis: 2000 // return an error after 2 seconds if a connection cannot be established
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.pgPool = pgPool;
}

