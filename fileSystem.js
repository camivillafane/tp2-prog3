//FileSystem
//Utilizando el archivo creado en el punto anterior:
//Agregar producto al archivo local.
//Eliminar los productos superiores a un determinado valor.

const fs = require('fs').promises;
const rutaArchivo = 'productos.json';


const nuevoProducto = {
  id: 21,
  title: "Zapatillas Urbanas",
  price: 59.99,
  description: "Zapatillas para uso diario",
  category: "calzado",
  image: "https://acdn-us.mitiendanube.com/stores/001/268/696/products/urbananegra1-ce3e1ea8501862542f16912648320251-240-0.jpg",
  rating: {
    rate: 4.5,
    count: 120
  }
};

const precioLimite = 50;

async function agregaryEliminarproductos() {
  try {
    
    const datos = await fs.readFile(rutaArchivo, 'utf-8');
    let productos = JSON.parse(datos);

  
    const existeProducto = productos.some(producto => producto.id === nuevoProducto.id);
    if (!existeProducto) {
      productos.push(nuevoProducto);
      console.log("Producto agregado:", nuevoProducto);
    } else {
      console.log(`Ya existe este producto.`);
    }


    const productosFiltrados = productos.filter(producto => producto.price <= precioLimite);
    const eliminados = productos.length - productosFiltrados.length;

    if (eliminados > 0) {
      console.log(` Se eliminaron ${eliminados} productos con precio mayor a $${precioLimite}.`);
    } else {
      console.log(` No hay productos por eliminar`);
    }

    await fs.writeFile(rutaArchivo, JSON.stringify(productosFiltrados, null, 2));
    console.log('\n Se actualizo el archivo\n');

    console.log('Productos actuales en el archivo:');
    productosFiltrados.forEach(producto => {
      console.log(`- ${producto.id}: ${producto.title} ($${producto.price})`);
    });

  } catch (error) {
    console.error('Error al actualizar el archivo:', error.message);
  }
}

agregaryEliminarproductos();
