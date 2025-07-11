# Detallando funcionalidad del código

Este código demuestrá como manejar operaciones asíncronas en javascript usando async/await y como se pueden
encadenar multiples operaciones asíncronas, aquí incluimos una simulación de retardo en red y una llamada a una
API real, también desarrollamos un concepto básico de programación reactiva con EventEmitter.

Primero realizamos las importaciones y configuraciones inicales

Importamos la librería de Axios, que es un cliente HTTP basado en promesas que se usa para realizar solicitudes APIs externas
como es el caso la de jsonplaceholder.typicode.com
Importamos la clase EventEmitter de node.js que nos permite trabajar con el patrón "observador" donde los objetos emiten eventos
y otros objetos pueden escucharlos y reaccionar a ellos.
Se crea una instancia de EventEmitter, instancia que será el "centro" donde se emitirán y escucharán los eventos en este código.

Simulando una operación asíncrona haciendo que el flujo se vea más síncrono

La función simularObtencionDatos símula una operación de red lenta que toma un tiempo, nos devuelve una promesa que se resuelve
después de 3 segundos y que durante esos 3 segundos imprime un mensaje en la consola, una vez que el setTimeout termina la
promesa se resuelve con un objeto que sería el mensaje de la variable datosSimulados.
El uso de async antes de la función await; cuando se llama a la función away simularObtencionDeDatos() permite que el programa "espere"
a que esta promesa se resuelva antes de continuar con la siguente línea de código.

El Encadenamiento con async/await - llamando a la API real

La función obtener datos realiza una solicitud HTTP GET a la API pública de JSONPlaceHolder para obtener una lista de publicaciones (/post)
También es una función async lo que significa que puede usar await dentro de ella. await axios.get() hace que la ejecución de la función se pause
hasta que la solicitud HTTP se complete y la promesa de axios de resuelva. Se manejan errores a través del try...catch en caso de que la API falle
el bloque catch lanza un nuevo error con un mensaje más descriptivo pero, si la solicitud es exitosa devuelve los datos de la respuesta de la API.

Encadenamiento y Procesamiento

La función procesarDatos es la función central donde se encadenan las operaciones asíncronas, primero espera a que la simulación de obtencionDeDatos
termine los 3 segundos, que después de la simulación se obtengan los datos reales de la API, cuando ambos datos estan disponibles filtra los datos
obtenidos de la API() para mostrar solo las publicaciones que corresponden a un userId especificado, luego mapea los datos filtrados a un nuevo formato
más limpio según se halla codeado cada elemento, también se esta manejando los errores a través de try...catch.

Ejecución y Presentación de Resultados

La función ejecutarProyecto es el puente de entrada para ejecutar todo el flujo donde se llama a la función procesardatos(userId) y espera que se complete y devuelve los datos filtrados, luego imprime de una manera formateada en la consola según la configuración especificada en el código, tambien se
manejan errores con try...catch.

Activación del Escuchador (Programación Reactiva con EventEmitter)

Aquí se registra un "escuchador" (listener) para un evento llamado clic, que cuando el evento "clic" sea emitido la función async(userId)=>{...}
se ejecutará y dentro de este escuchador se llama a ejecutarProyecto(userId).

Al explicar el funcionamiento de nuestro código se detalla:

Flujo de ejecución

La Emisión del Evento: el evento.emit('clic', 1); dispara el evento 'clic'

La Activación del escuchador: con evento.on('clic',...) se activa y ejecuta la función async(userId)=>{...} con userId = 1.

Iniciando el Proyecto, dentro de escuchador se llama a ejecutarProyecto(1)

Procesando los Datos; al ejecutarProyecto llama a procesarDatos.

procesarDatos primero llama a simularObtencionDeDatos() lo que causa un retardo de 3 segundos mientras imprime "Simulando retardo de red..."

Una vez que la simulación termina, procesarDatos llama a obtenerDatos() que realiza una solicitud HTTP real a JSONPlacerHolder.

Después de obtener los datos de la API, procesarDatos los filtra para el userID 1 y los formatea.

La Presentación de Resultados; una vez que procesarDatos devuelve los datos filtrados, ejecutarProyectos los imprime de manera estructurada en consola.

En el manejo de errores; cualquier error que ocurra en cualquiera de las funciones asíncronas será capturado por los bloques try...catch correspondientes y finalmente reportado por ejecutarProyecto.
