
const axios = require('axios');
const EventEmitter = require('events');
const evento = new EventEmitter();

// 1 Operación asíncrona simulada: .
// Crear una función asíncrona que simule la obtención de datos desde un servidor usando setTimeout.

async function simularObtencionDeDatos() {
  return new Promise((resolve, reject) => {
    console.log(" Simulando retardo de red...");
    setTimeout(() => {
      // Simulamos datos ficticios
      const datosSimulados = { mensaje: "Datos simulados obtenidos" };
      resolve(datosSimulados);
    }, 3000); // Retardo de 3 segundos
  });
}

// 2 Encadenamiento con async/await

// Crear una segunda función asíncrona que procese los datos obtenidos
async function obtenerDatos() {
  try {
    console.log("Obteniendo datos desde JSONPlaceholder...");
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return respuesta.data;
  } catch (error) {
    throw new Error("Error al obtener datos desde la API");
  }
}
// Función que encadena ambas funciones usando await
async function procesarDatos(userId) {
  try {
    // Primero simulamos la obtención de datos
    const datosSimulados = await simularObtencionDeDatos();
    console.log(datosSimulados.mensaje);

    // Luego obtenemos los datos reales
    const datos = await obtenerDatos();
    const datosFiltrados = datos
      .filter(post => post.userId == userId)
      .map(post => ({
        id: post.id,
        titulo: post.title,
        contenido: post.body,
        resumen: post.body.substring(0, 50) + '...'
      }));
    return datosFiltrados;
  } catch (error) {
    throw new Error("Error al procesar los datos");
  }
}

async function ejecutarProyecto(userId) {  
  try {
    const resultado = await procesarDatos(userId);    
    console.log(`\n Posts del usuario ${userId} (${resultado.length} resultados):`);
    resultado.forEach(post => {      
      console.log(` ID: ${post.id}`);
      console.log(` Título: ${post.titulo}`);
      console.log(` Resumen: ${post.resumen}`);
      console.log('══════════════════════════════\n');
    });
    
  } catch (error) {
    console.error(" Error:", error.message);
  }
}

// 4 Programación reactiva
// Probamos con userId 1
evento.on('clic', async (userId) => {
  console.log(`\n Buscando posts del usuario: ${userId}`);
  await ejecutarProyecto(userId);
});

evento.emit('clic', 1);
