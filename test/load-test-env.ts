import { readFileSync } from 'fs';
import { join } from 'path';

try {
  const envFile = readFileSync(join(__dirname, `../.env.test`), 'utf-8');
  const envLocalLines = envFile.split('\n');

  for (const line of envLocalLines) {
    if (line.trim() === '' || line.trim().startsWith('#')) continue;
    const [key, value] = line.split('=');

    process.env[key.trim()] = value.trim();
  }
} catch (err) {
  console.log(err);
  throw new Error(`Could not open .env file`);
}
