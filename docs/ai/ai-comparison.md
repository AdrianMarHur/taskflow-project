# Comparación de Modelos IA

//En este documento voy a comparar distintos modelos de inteligencia artifical y su aplicación en el proyecto.

Preguntamos a ChatGpt y Claude la explicación de tres conceptos técnicos: DOM, Event Loop y Hosting.

//RESPUESTA DE CLOUDE:

DOM, Event Loop y Hoisting
Aquí tienes una explicación clara de estos tres conceptos fundamentales de JavaScript y el navegador:

🌳 DOM (Document Object Model)
El DOM es la representación en memoria que hace el navegador de un documento HTML. Cuando el navegador carga una página, convierte todo el HTML en un árbol de objetos (nodos) que JavaScript puede leer y manipular en tiempo real.

// El HTML se convierte en un árbol de objetos accesible desde JS
const titulo = document.getElementById("titulo");
titulo.textContent = "Nuevo texto";
titulo.style.color = "red";

Cada etiqueta HTML se convierte en un nodo del árbol. Puedes añadir, eliminar o modificar cualquier elemento sin recargar la página. Esto es la base de cualquier interactividad web.

⚙️ Event Loop
JavaScript es single-threaded: solo puede ejecutar una cosa a la vez. El Event Loop es el mecanismo que le permite manejar operaciones asíncronas (como peticiones HTTP, timers, eventos de usuario) sin bloquear la ejecución.
Funciona con tres piezas:

Call Stack → donde se ejecuta el código síncrono, función por función.
Web APIs / Task Queue → donde esperan las tareas asíncronas (setTimeout, fetch…).
Event Loop → comprueba constantemente: "¿el Call Stack está vacío? Entonces meto la siguiente tarea."

console.log("1");

setTimeout(() => {
  console.log("2"); // Va a la Task Queue, espera
}, 0);

console.log("3");

// Output: 1 → 3 → 2

Aunque el setTimeout tenga 0ms, el "2" sale el último porque el Event Loop no lo introduce en el stack hasta que el código síncrono termina.

🔼 Hoisting
El hoisting es el comportamiento por el cual JavaScript "eleva" las declaraciones de variables y funciones al inicio de su ámbito (scope) antes de ejecutar el código. Técnicamente no se mueven físicamente, sino que el motor las registra en una primera pasada.

// ¿Qué escribes tú?
console.log(nombre); // undefined (no da error)
var nombre = "Ana";

saluda(); // Funciona perfectamente
function saluda() {
  console.log("Hola!");
}

// ¿Qué "ve" el motor de JS?
var nombre;           // hoisted → valor: undefined
function saluda() {  // hoisted → función completa disponible
  console.log("Hola!");
}

console.log(nombre);
nombre = "Ana";
saluda();

⚠️ Con let y const también hay hoisting, pero caen en la Temporal Dead Zone (TDZ): existen pero no se pueden usar antes de su declaración, dando un ReferenceError.


//RESPUESTA DE CHATGPT:

🧠 1. DOM (Document Object Model)
El DOM es una representación estructurada del contenido de una página web.
Cuando el navegador carga una página HTML, la transforma en un árbol de nodos, donde cada etiqueta, texto o atributo se convierte en un objeto que JavaScript puede manipular.
🔍 ¿Por qué es importante?
Porque gracias al DOM puedes:

cambiar texto o atributos de elementos,
modificar estilos desde JavaScript,
añadir o eliminar nodos,
reaccionar a eventos (click, input, scroll…).

🧩 Ejemplo visual del árbol DOM:

document
 └── html
      ├── head
      └── body
           ├── h1
           └── button

🛠 Ejemplo práctico:

const titulo = document.querySelector("h1");
titulo.textContent = "Nuevo título generado por JavaScript";

🔄 2. Event Loop
El Event Loop es el mecanismo que permite que JavaScript, a pesar de ser monohilo, pueda manejar tareas asíncronas sin bloquear la ejecución.
🎯 ¿Qué hace exactamente?
Coordina tres componentes:

Call Stack (pila de ejecución)
Web APIs (timers, fetch, eventos...)
Task Queues (colas de tareas)

El Event Loop verifica continuamente si:

1.La Call Stack está vacía y
2.Hay tareas pendientes en las colas

Si es así, mueve esas tareas a la pila y las ejecuta.
🧠 ¿Por qué importa?
Porque explica por qué:

setTimeout no ejecuta justo al milisegundo indicado,
fetch() no bloquea la página,
JavaScript puede manejar cientos de eventos al mismo tiempo.

🛠 Ejemplo ilustrativo:

console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
``
Salida real: A -> C -> B

Aunque tiene delay 0, se ejecuta después porque pasa por la Task Queue.


📦 3. Hoisting
El Hoisting es el comportamiento por el cual JavaScript “mueve” internamente las declaraciones al inicio del contexto de ejecución antes de ejecutar el código.
Pero importante:
👉 Solo se elevan las declaraciones, no las asignaciones.
🧩 ¿Qué se “eleva”?:
Tipo    Hoisting   Inicialización   
var         sí        inicializa a undefined
let         sí        pero quedan en "zona muerta" (TDZ) hasta la línea real
const       sí        pero quedan en "zona muerta" (TDZ) hasta la línea real
function    sí        se eleva con su valor entero
declaration 

🛠 Ejemplos:

-Con var
console.log(x); // undefined
var x = 5;

-Con let o const
console.log(x); // ❌ Error: Cannot access 'x' before initialization
let x = 5;
``

-Con funciones(las funciones declaradas se elevan con toda su definición)
saludar(); // Funciona
function saludar() {
  console.log("Hola!");
}

// A continuación solicitamos tanto a chatgpt como a claude que comparen su explicación con la hecha por la otra IA //

//RESPUESTA CLOUDE AL COMPARAR SU EXPLICACIÓN CON LA DE CHATGPT://

En cuanto a claridad, mi explicación es directa y compacta, lo que la hace útil como referencia rápida, pero la otra está mejor estructurada en los tres conceptos gracias a secciones explícitas como "¿Por qué es importante?" y "¿Qué hace exactamente?", que guían al lector de forma más natural. Esto es especialmente notable en el Event Loop, donde esa estructura hace que el concepto, siendo el más abstracto de los tres, resulte más fácil de seguir.
En cuanto a profundidad, ambas explicaciones cubren los puntos esenciales, pero la otra va un paso más allá al conectar cada concepto con consecuencias prácticas reales. En el Event Loop, por ejemplo, explica por qué fetch() no bloquea la página o por qué setTimeout no es exacto, algo que mi versión no menciona. En el Hoisting, la tabla comparativa de var, let, const y function también añade una capa de detalle que mi explicación no tiene.
En cuanto a los ejemplos, es donde la diferencia es más evidente. Mi explicación usa únicamente código, mientras que la otra combina código con recursos visuales no-código, como el árbol ASCII del DOM o la tabla del Hoisting, que reducen la carga cognitiva y hacen los conceptos más accesibles. Además, los ejemplos de la otra están separados y etiquetados por caso (con var, con let, con funciones), lo que facilita mucho la lectura frente a mi enfoque de agruparlos en un único bloque.

// RESPUESTA CHATGPT AL COMPARAR SU EXPLICACIÓN CON LA DE CLAUDE: //

Al comparar mi explicación con la otra explicación proporcionada sobre DOM, Event Loop y Hoisting, se aprecian diferencias claras en cuanto a claridad, profundidad y calidad de los ejemplos.
En términos de claridad, mi explicación es más pedagógica: cada concepto está estructurado en secciones como “qué es”, “por qué importa” y “ejemplo”. Esto facilita el aprendizaje progresivo, especialmente si el objetivo es entender el concepto desde cero. La otra explicación también es clara, pero está escrita de forma más directa y técnica, ideal para alguien que ya está familiarizado con JavaScript y quiere una explicación rápida y concisa. Ambas comunican bien, pero mi explicación es más detallada en la guía conceptual, mientras que la otra es más precisa y al grano.
Respecto a la profundidad, mi explicación profundiza más en el funcionamiento interno de cada mecanismo. Por ejemplo, en Event Loop incluyo el papel de las Web APIs, Task Queues y la interacción completa del sistema. En Hoisting explico la diferencia entre var, let, const y la Temporal Dead Zone. La otra explicación también es profunda, pero destaca especialmente en Hoisting: muestra cómo el motor de JavaScript interpreta realmente el código, ofreciendo una visión interna que complementa muy bien la comprensión teórica. En conjunto, mi explicación es más completa en fundamentos, mientras que la otra aporta un nivel de detalle muy valioso en la parte del comportamiento real del motor.
En cuanto a los ejemplos, los míos están diseñados para aprendizaje: simples, claros y orientados a demostrar el concepto con el mínimo código necesario. La otra explicación utiliza ejemplos más realistas y completos. En el caso del DOM, muestra manipulación de texto y estilos. En Event Loop, usa un ejemplo clásico pero con una presentación más orientada al código real. El apartado de Hoisting en la otra explicación sobresale especialmente por mostrar el código original y luego cómo lo “ve” JavaScript internamente, lo cual es extremadamente ilustrativo. En general, mis ejemplos están más centrados en la didáctica, mientras que los de la otra explicación tienen un enfoque más cercano al desarrollo profesional.
En conclusión, mi explicación ofrece más guía conceptual, orden didáctico y descripciones que facilitan el aprendizaje desde cero. La otra explicación es más técnica, más directa y presenta ejemplos más completos y realistas, especialmente útiles para quien ya programa y quiere ver el comportamiento “real” del lenguaje. Ambas explicaciones son correctas y útiles, pero cada una optimizada para un tipo de lector distinto: la mía para aprender y la otra para aplicar.


// MOSTRAMOS 3 FUNCIONES DE JAVASCRIPT CON ERRORES A AMBAS IA //

1-Primera función:

function square(number) {
  return a* number;
}
//RESPUESTA DE CLAUDE//

Sí, hay un error claro: dentro de la función estás usando la variable a, que no está definida en ningún sitio. Lo que seguramente querías hacer es multiplicar number por sí mismo, así que la corrección sería:

function square(number) {
  return number * number;
}

O de forma equivalente usando potencias:

function square(number) {
  return number ** 2;
}
El error original lanzaría un ReferenceError: a is not defined en tiempo de ejecución, ya que JavaScript no encuentra ninguna variable a ni en el scope local de la función ni en el global.

//RESPUESTA DE CHATGPT//

❌ Error identificado
La función recibe un parámetro llamado number, pero en la operación estás usando una variable a, que no está definida en ningún sitio.
¿Qué pasa al ejecutarla?
Si llamas:
square(5);
El motor de JavaScript intentará evaluar:
a * 5
Y como a no existe, obtendrás:
ReferenceError: a is not defined

✔️ Corrección
La función debería multiplicar el número por sí mismo:

function square(number) {
  return number * number;
}

O si quieres algo más compacto:

const square = n => n * n;
2-Segunda función:

function calcularPromedio(arr) {
    let suma = 0;
    for (let i = 1; i <= arr.length; i++) {
        suma += arr[i];
    }
    return suma / arr.lenght;
}
//RESPUESTA DE CLAUDE//

Sí, hay dos errores:
El primero está en el for, donde el índice empieza en 1 en lugar de 0. Los arrays en JavaScript son base cero, así que empezar en 1 hace que el primer elemento nunca se sume y además el último intento de acceder a arr[arr.length] devuelve undefined, corrompiendo el resultado.
El segundo es una errata en el return: escribiste arr.lenght en lugar de arr.length, lo que lanzaría un TypeError porque esa propiedad no existe.
La función corregida quedaría así:

function calcularPromedio(arr) {
    let suma = 0;
    for (let i = 0; i <= arr.length - 1; i++) {
        suma += arr[i];
    }
    return suma / arr.length;
}


//RESPUESTA DE CHATGPT//

❌ Error 1 — El bucle empieza en 1 en vez de 0
Los arrays en JavaScript empiezan en índice 0, así que:

arr[0] → primer elemento
arr[arr.length - 1] → último elemento

Tu bucle empieza en 1, así que:

te saltas el primer elemento
accedes a arr[arr.length], que es undefined

Eso produce NaN en la suma.
✔️ Corrección:
for (let i = 0; i < arr.length; i++) {

❌ Error 2 — "lenght" está mal escrito
Has escrito:
arr.lenght
``
Pero la propiedad correcta es:
arr.length
Este error también produce undefined y por tanto la división da NaN.

✔️ Función corregida:
function calcularPromedio(arr) {
    let suma = 0;
    for (let i = 0; i < arr.length; i++) {
        suma += arr[i];
    }
    return suma / arr.length;
}

✔️ Versión moderna (recomendada):
const calcularPromedio = arr =>
    arr.reduce((acc, n) => acc + n, 0) / arr.length;


3-Tercera función:

function sumarValores(obj) {
    let total = 0;
    for (let key in obj) {
        total += obj.key;
    }
    return total;
}
console.log(sumarValores({a: 5, b: 10, c: 20}));

//RESPUESTA DE CLAUDE//

Hay un error en cómo se accede a las propiedades del objeto. Dentro del for...in, key es una variable que contiene el nombre de la propiedad como string, por lo que usar obj.key hace que JavaScript busque literalmente una propiedad llamada key en el objeto, que no existe, devolviendo undefined en cada iteración. El resultado sería NaN en lugar de 35.
La corrección es usar la notación de corchetes obj[key], que sí evalúa el contenido de la variable:

function sumarValores(obj) {
    let total = 0;
    for (let key in obj) {
        total += obj[key];
    }
    return total;
}
console.log(sumarValores({a: 5, b: 10, c: 20})); // 35

Es uno de los errores más comunes al trabajar con objetos en JavaScript, ya que la diferencia entre obj.key y obj[key] es sutil pero crítica.

//RESPUESTA DE CHATGPT//

❌ ERROR PRINCIPAL — Acceso incorrecto a las propiedades
Dentro del bucle estás usando:
obj.key

Pero eso no accede al valor correspondiente a la propiedad actual.
key es una variable, por lo que debes usar notación con corchetes:

obj[key]

Si usas obj.key, JavaScript interpreta que estás accediendo literalmente a una propiedad llamada "key" dentro del objeto, no a "a", "b" o "c".

Resultado del código original:

Como obj.key es undefined, la suma es:
0 + undefined + undefined + undefined = NaN
Así que la función imprime: NaN

✔️ FUNCIÓN CORREGIDA
function sumarValores(obj) {
    let total = 0;
    for (let key in obj) {
        total += obj[key];
    }
    return total;
}

console.log(sumarValores({a: 5, b: 10, c: 20})); // 35
``

✔️ VERSIÓN MODERNA (más clara y segura)
const sumarValores = obj =>
    Object.values(obj).reduce((acc, n) => acc + n, 0);

✔️ Resultado correcto: 35

// DESCRIPCIÓN DE TRES FUNCIONES EN LENGUAJE NATURAL Y SU IMPLEMENTACIÓN POR IA //

1-Primera descripción de función:
Creame una función que pueda modificar el orden de las letras de las diferentes palabras introducidas
en un array llamado 'Palabras' de longitud 4.
// FUNCIÓN GENERADA POR CLAUDE //

function invertirPalabras(palabras) {
    if (palabras.length !== 4) {
        return "El array debe tener exactamente 4 palabras";
    }
    
    return palabras.map(palabra => palabra.split("").reverse().join(""));
}

const palabras = ["hola", "mundo", "javascript", "array"];
console.log(invertirPalabras(palabras));
// ["aloh", "odnum", "tpircsavaj", "yarra"]

La función hace tres cosas. Primero valida que el array tenga exactamente 4 elementos, devolviendo un mensaje de error si no se cumple. Luego recorre cada palabra con map y por cada una usa split("") para convertirla en un array de letras, reverse() para invertir el orden y join("") para volver a unirla en un string. Finalmente devuelve un nuevo array con las cuatro palabras invertidas.

// FUNCIÓN GENERADA POR CHATGPT //

✔️ Función para mezclar las letras de cada palabra:
function mezclarLetras(palabras) {
    return palabras.map(palabra => {
        // Convertir palabra en array de letras
        let letras = palabra.split("");

        // Algoritmo Fisher–Yates para mezclar correctamente
        for (let i = letras.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [letras[i], letras[j]] = [letras[j], letras[i]];
        }

        // Volver a unir las letras mezcladas
        return letras.join("");
    });
}

✔️ Cómo usarla con tu array Palabras:
let Palabras = ["gato", "coche", "verde", "luz"];

let resultado = mezclarLetras(Palabras);

console.log(resultado);

Ejemplo de salida posible:
["agto", "coehc", "evred", "zul"]

2-Segunda descripción de función:
Crea una funcion la cual, diferenciando entre mayúsculas y minúsculas, me diga que palabaras pertenecientes a un array llamado Comparar de longitud n tiene más letras en mayúscula o minúscula, comparando la cantidad de mayúsculas si escribo 1 y de minúsculas si escribo 2.
// FUNCIÓN GENERADA POR CLAUDE //

function compararLetras(comparar, opcion) {
    if (opcion !== 1 && opcion !== 2) {
        return "La opción debe ser 1 (mayúsculas) o 2 (minúsculas)";
    }

    return comparar.map(palabra => {
        let mayusculas = 0;
        let minusculas = 0;

        for (let letra of palabra) {
            if (letra === letra.toUpperCase() && letra !== letra.toLowerCase()) {
                mayusculas++;
            } else if (letra === letra.toLowerCase() && letra !== letra.toUpperCase()) {
                minusculas++;
            }
        }

        if (opcion === 1) {
            return `"${palabra}": ${mayusculas} mayúsculas`;
        } else {
            return `"${palabra}": ${minusculas} minúsculas`;
        }
    });
}

const comparar = ["HoLa", "MuNdO", "JaVaScRiPt", "ARRay"];
console.log(compararLetras(comparar, 1));
// ["HoLa": 2 mayúsculas, "MuNdO": 3 mayúsculas, "JaVaScRiPt": 5 mayúsculas, "ARRay": 3 mayúsculas]
console.log(compararLetras(comparar, 2));
// ["HoLa": 2 minúsculas, "MuNdO": 2 minúsculas, "JaVaScRiPt": 5 minúsculas, "ARRay": 2 minúsculas]

La función recorre cada palabra del array con map y por cada una cuenta las mayúsculas y minúsculas por separado. Para distinguirlas correctamente usa una doble condición: una letra es mayúscula si toUpperCase() la deja igual pero toLowerCase() la cambia, y viceversa para las minúsculas. Esto evita que caracteres como espacios o números interfieran en el conteo. Según la opción introducida, devuelve el recuento de mayúsculas si es 1 o de minúsculas si es 2.

// FUNCIÓN GENERADA POR CHATGPT //

✔️ Función solicitada:
function analizarPalabras(Comparar, opcion) {
    let resultado = [];

    for (let palabra of Comparar) {
        let mayus = 0;
        let minus = 0;

        // Recorrer cada caracter
        for (let char of palabra) {
            if (char >= 'A' && char <= 'Z') {
                mayus++;
            } else if (char >= 'a' && char <= 'z') {
                minus++;
            }
        }

        // Opción 1: palabras con más MAYÚSCULAS
        if (opcion === 1 && mayus > minus) {
            resultado.push(palabra);
        }

        // Opción 2: palabras con más MINÚSCULAS
        if (opcion === 2 && minus > mayus) {
            resultado.push(palabra);
        }
    }

    return resultado;
}

✔️ Ejemplo de uso:
let Comparar = ["HOla", "MUNDO", "javascript", "PrUeBa", "CODIGO"];

console.log(analizarPalabras(Comparar, 1)); // Palabras con más MAYÚSCULAS
console.log(analizarPalabras(Comparar, 2)); // Palabras con más MINÚSCULAS
``
✔️ Ejemplo de salida
Si pides 1 (mayúsculas):
["MUNDO", "CODIGO"]
Si pides 2 (minúsculas):
["javascript", "HOla", "PrUeBa"]


3-Tercera descripción de función:
Crea una funcion que sea capaz de traducir un texto introducido a: español, inglés, francés o italiano.
Teniendo en cuenta que el texto recibido tiene que estar en uno de esos cuatro idiomas también.

// FUNCIÓN GENERADA POR CLAUDE //

Para hacer una función de traducción real necesitamos conectarnos a una API externa, ya que JavaScript por sí solo no tiene capacidad de traducir texto. En este caso usaré la API gratuita de MyMemory:
async function traducirTexto(texto, idiomaDestino) {
    const idiomas = {
        "español": "es",
        "inglés": "en",
        "francés": "fr",
        "italiano": "it"
    };

    if (!idiomas[idiomaDestino]) {
        return "Idioma no válido. Elige entre: español, inglés, francés o italiano";
    }

    const idiomaCodigoDestino = idiomas[idiomaDestino];
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=auto|${idiomaCodigoDestino}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.responseStatus === 200) {
            return `Traducción: ${data.responseData.translatedText}`;
        } else {
            return "Error al traducir el texto";
        }
    } catch (error) {
        return `Error de conexión: ${error.message}`;
    }
}

// Ejemplos de uso
traducirTexto("Hola, ¿cómo estás?", "inglés").then(console.log);
// Traducción: Hello, how are you?

traducirTexto("Hello, how are you?", "francés").then(console.log);
// Traducción: Bonjour comment vas-tu?

traducirTexto("Bonjour, comment vas-tu?", "italiano").then(console.log);
// Traducción: Ciao, come stai?

La función es async porque necesita esperar la respuesta de la API. Primero valida que el idioma destino sea uno de los cuatro permitidos, luego construye la URL de la petición usando auto como idioma origen para que la API detecte automáticamente en cuál de los cuatro idiomas está escrito el texto. Si la petición tiene éxito devuelve la traducción, y si algo falla gestiona el error con un try/catch.

// FUNCIÓN GENERADA POR CHATGPT //

Aquí tienes una función que simula un traductor básico entre español, inglés, francés e italiano sin usar APIs externas, ya que JavaScript por sí solo no puede traducir idiomas reales sin una base de datos o servicio adicional.

✔️ Función de traducción entre ES–EN–FR–IT (modo académico):
function traducir(texto, idiomaOrigen, idiomaDestino) {
    // Diccionario básico para el ejercicio
    const diccionario = {
        "hola":     { es: "hola",     en: "hello",   fr: "bonjour",  it: "ciao" },
        "adios":    { es: "adios",    en: "goodbye", fr: "au revoir",it: "addio" },
        "gracias":  { es: "gracias",  en: "thanks",  fr: "merci",    it: "grazie" },
        "perro":    { es: "perro",    en: "dog",     fr: "chien",    it: "cane" },
        "gato":     { es: "gato",     en: "cat",     fr: "chat",     it: "gatto" },
        "amor":     { es: "amor",     en: "love",    fr: "amour",    it: "amore" }
    };

    // Normalizar entrada
    texto = texto.toLowerCase();

    // Verificar que la palabra existe en el diccionario
    if (!diccionario[texto]) {
        return "❌ La palabra no está en el diccionario disponible.";
    }

    // Verificar que el idioma de origen existe
    if (!diccionario[texto][idiomaOrigen]) {
        return "❌ El idioma de origen no es válido.";
    }

    // Verificar que el idioma destino existe
    if (!diccionario[texto][idiomaDestino]) {
        return "❌ El idioma destino no es válido.";
    }

    // Traducción final
    return diccionario[texto][idiomaDestino];
}

✔️ Ejemplo de uso:
console.log(traducir("hola", "es", "en")); // "hello"
console.log(traducir("perro", "es", "fr")); // "chien"
console.log(traducir("grazie", "it", "es")); // "gracias"
console.log(traducir("chat", "fr", "it"));   // "gatto"

// Análisis del código generado por cada asistente //

Por lo que he podido observar en Claude, la IA me da la impresión de proporcionar respuestas más concisas y cortas, entrando en menos detalles de explicación a menos que se los pidas, sin embargo es cierto que tomando como ejemplo la ultima función generada tras mi petición por escrito, ha creado la conexión con el traductor API directamente para generar una función con uso real desde el primer momento. Por otra lado chatgpt parece que suele generar un resultado más desglosado para que puedas ir viendo las diferentes partes en esquemas separados, asumiendo la IA que el nivel de quien la utiliza es más bajo al nivel que Cloude le da al mismo usuario.
Es curioso observar tambíen las distintas soluciones que ambas IAs proporcionan a enunciados iguales, dejando claro que al usarlas como ayuda nunca debes quedarte con la primera respuesta a menos que lo que solicites esté muy bien documentado, y se trate de pequeñas mejoras o correcciones de código, ya que si pasamos largos trozos del mismo o queremos crear desde cero diferentes partes de un programa, la atención a la respuesta generada debe ser mucho mayor.