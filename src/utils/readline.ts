import * as readlineNative from 'readline';

export const rl = readlineNative.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function question(queryText: string): Promise<string> {
  return new Promise((resolve) => rl.question(queryText, resolve));
}

export function pause(): Promise<string> {
  return question('\nPresione ENTER para continuar...');
}