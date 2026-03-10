# Workflow de Trabajo con Cursor

(*Aquí documentaré cómo utilizo Cursor para modificar el proyecto mediante IA*)

//Redactamos comentario para generar función automática en cursor.js//

//Función en javascript que crea un sumatorio de numeros impares y devuelve el resultado
//El array del cual tomas los numero se llama impar y tiene 5 elementos
//La función se llama sumatorioImpares y devuelve el resultado


Resultado obtenido:

function sumatorioImpares(impar) {
    let suma = 0;
    for (let i = 0; i < impar.length; i++) {
        if (impar[i] % 2 !== 0) {
            suma += impar[i];
        }
    }
    return suma;
}

//Explicación del chat integrado con IA sobre la función generada//

Explicación paso a paso:

Parámetro:

impar: es un array (lista) de números. Según tu comentario, tiene 5 elementos.
Variable suma:

let suma = 0; inicializa un acumulador a 0, donde iremos sumando los números impares.
Bucle for:

for (let i = 0; i < impar.length; i++) { ... }
Recorre todos los índices del array, desde 0 hasta impar.length - 1.
Comprobación de número impar:

if (impar[i] % 2 !== 0) { ... }
Usa el operador módulo % para ver si el resto de dividir el número entre 2 es distinto de 0.
Si el resto no es 0, el número es impar.
Acumulación de la suma:

suma += impar[i];
Si el número es impar, se añade al total acumulado en suma.
Devolución del resultado:

return suma;
Al terminar el bucle, devuelve la suma de todos los números impares del array.
En resumen:
sumatorioImpares recibe un array de números, recorre todos sus elementos y devuelve la suma de aquellos que son impares.

//GENERAMOS OTRA FUNCIÓN PARA PROBAR LA EDICIÓN INLINE//

//Descripción nueva función://

//La función se llama palabras y el array se llama palabras.
//El array palabras tiene 10 elementos que se introducen manualmente.   
//La función devuelve el array con las palabras.
//La función se ejecuta hasta que el número de elementos del array al dividirlo por 7 de resto 0.

//RESULTADO GENERADO://
function palabras(palabras) {
    let palabras = ["hola", "mundo", "javascript", "array", "python", "java", "c++", "php", "html", "css"];
    while (palabras.length % 7 !== 0) {
        palabras.push("palabra");
    }
    return palabras;
}

console.log(palabras());

//Procemos a modificar inline la función anterior:

//Modificamos inline la función anterior
//Usando Edit with AI
//Haciendo ahora que para cuando palabras.length % 8 === 0 se detenga.

//Resultado:
function palabras(palabras) {
    let palabras = ["hola", "mundo", "javascript", "array", "python", "java", "c++", "php", "html", "css"];
    while (palabras.length % 8 !== 0) {
        palabras.push("palabra");
    }
    return palabras;
}

console.log(palabras());

// PROBAMOS COMPOSER EN CURSOR.JS //

//Pedimos que nos cree un archivo nuevo usando las mismas funciones pero este caso en typescript//

//Resultado:
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


// Atajos más comunes que uso en mi teclado: //

Ctrl + K — Inline Edit (Edición con IA)
Ctrl + L - Abre el chat lateral de IA
Si seleccionas código y pulsas Ctrl + L, lo envías al chat

Ctrl + I — Abrir Composer
Ctrl + Shift + I — Composer en pantalla completa

Tab → aceptar sugerencia de IA
Esc → rechazar sugerencia de IA

Alt + ↑ / ↓ — Mover líneas
Shift + Alt + ↑/↓ — Duplicar línea
Ctrl + Shift + L — Seleccionar todas las coincidencias
Alt + Click — Múltiples cursores
Ctrl + ` — Abrir terminal integrado
Ctrl + N — Nuevo archivo
Ctrl + S — Guardar
Ctrl + Shift + G — Abrir panel de Git
Ctrl + Enter — Hacer commit