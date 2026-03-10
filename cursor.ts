export function sumatorioImpares(impares: number[]): number {
  let suma = 0;

  for (let i = 0; i < impares.length; i++) {
    const n = impares[i];
    if (n % 2 !== 0) suma += n;
  }

  return suma;
}

const PALABRAS_BASE: string[] = [
  "hola",
  "mundo",
  "javascript",
  "array",
  "python",
  "java",
  "c++",
  "php",
  "html",
  "css",
];

export function palabrasHastaMultiplo8(base: readonly string[] = PALABRAS_BASE): string[] {
  const palabras = [...base];

  while (palabras.length % 8 !== 0) {
    palabras.push("palabra");
  }

  return palabras;
}

