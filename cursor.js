//Función en javascript que crea un sumatorio de numeros impares y devuelve el resultado
//El array del cual tomas los numero se llama impar y tiene 5 elementos
//La función se llama sumatorioImpares y devuelve el resultado

function sumatorioImpares(impar) {
    let suma = 0;
    for (let i = 0; i < impar.length; i++) {
        if (impar[i] % 2 !== 0) {
            suma += impar[i];
        }
    }
    return suma;
}

//La función se llama palabras y el array se llama palabras.
//El array palabras tiene 10 elementos que se introducen manualmente.   
//La función devuelve el array con las palabras.
//La función se ejecuta hasta que el número de elementos del array al dividirlo por 7 de resto 0.

function palabras(palabras) {
    let palabras = ["hola", "mundo", "javascript", "array", "python", "java", "c++", "php", "html", "css"];
    while (palabras.length % 7 !== 0) {
        palabras.push("palabra");
    }
    return palabras;
}

console.log(palabras());

//Modificamos inline la función anterior
//Usando Edit with AI
//Haciendo ahora que para cuando palabras.length % 8 === 0 se detenga.

function palabras(palabras) {
    let palabras = ["hola", "mundo", "javascript", "array", "python", "java", "c++", "php", "html", "css"];
    while (palabras.length % 8 !== 0) {
        palabras.push("palabra");
    }
    return palabras;
}

console.log(palabras());