import { sql } from './sql.js'

await sql`
    CREATE TABLE IF NOT EXISTS videos(
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        duration INTEGER
    );
`