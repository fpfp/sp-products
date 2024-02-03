import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const filePath = join(__dirname, `../.env`);
if (existsSync(filePath)) {
  try {
    const envFile = readFileSync(filePath, 'utf-8');
    const lines = envFile.split('\n');

    for (const line of lines) {
      if (line.trim() === '' || line.trim().startsWith('#')) continue;
      const [key, value] = line.split('=');

      process.env[key.trim()] = value.trim();
    }
  } catch (err) {
    console.log(err);
    throw new Error(`Could not read .env file`);
  }
}
process.env.NODE_ENV = 'test';
process.env.DB_DATABASE = `${process.env.DB_DATABASE}_test`;
