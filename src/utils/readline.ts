import * as console from 'readline';

export const interfazConsola = console.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function preguntar(textoPregunta: string): Promise<string> {
  return new Promise((resolver) => {
    interfazConsola.question(textoPregunta, resolver);
  });
}

export function pausar(): Promise<string> {
  return preguntar('\nPresione ENTER para continuar...');
}