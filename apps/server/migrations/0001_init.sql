CREATE TABLE users (
  id TEXT PRIMARY KEY NOT NULL,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Init user for agent/API smoke tests. Username and password both =
-- package.json name (e.g. starter); never init / password. Keep
-- INIT_USERNAME / INIT_PASSWORD in .env* in sync. Plaintext accepted
-- for this seed only; delete when no longer needed.
INSERT INTO users (id, username, password_hash)
VALUES (
  '00000000-0000-4000-8000-000000000001',
  'starter',
  'starter'
);
