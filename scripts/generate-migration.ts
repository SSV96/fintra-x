import * as promptSync from 'prompt-sync';
import { execSync } from 'child_process';

const prompt = promptSync();
const migrationName = prompt('Enter migration name: ');

if (!migrationName) {
  console.error('Migration name is required!');
  process.exit(1);
}

const command = `npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate src/common/postgres/migrations/${migrationName} -d src/common/postgres/data.source.ts`;

console.log(`Running: ${command}`);

function runCommand(command: string) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error('Error executing command:', error);
    process.exit(1);
  }
}
runCommand(command);
console.log(`Migration ${migrationName} generated successfully!`);
console.log(
  'Please check the generated migration file in src/common/postgres/migrations',
);
