import fs from "fs";

// Recuperar todos los productos
const url = "https://fakestoreapi.com/products/";

async function getProductos() {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error ' + response.status);
        }

        const datos = await response.json();
        console.log("\nProductos obtenidos:", datos);
        return datos;
        
    } catch (error) {
        console.log('\nOcurrió un error:', error.message);
    }
}

// Persistir los datos de la consulta anterior en un archivo local JSON

async function persistirDatos() {
  try {
    const response = await getProductos();

    if (!response) {
      console.error('Error');
      return;
    }

    await fs.promises.writeFile('productos.json', JSON.stringify(response, null, 2));
    console.log('Datos guardados en productos.json');
  } catch (error) {
    console.error('Error:', error);
  }
};

// Agregar un nuevo producto
async function addProduct() {
    const newProduct = {
        title: "Laptop Gamer",
        price: 2500,
        description: "Laptop de alto rendimiento con placa RTX",
        image: "https://i.pravatar.cc",
        category: "electronics"
    };

    try {
        const res = await fetch("https://fakestoreapi.com/products", {
            method: "POST",
            body: JSON.stringify(newProduct),
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();
        console.log("\nProducto agregado a la API:", data);

    } catch (err) {
        console.error("\nNo se pudo agregar el producto:", err.message);
    }
}

//Buscar la informacion de un determinado producto utilizando un id como parametro
async function buscarProducto(id) {
    try {
        const response = await fetch(`${url}${id}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }

        const producto = await response.json();
        console.log(`\nProducto ID: ${id} encontrado:`, producto);

    } catch (error) {
        console.log(`\nNo se pudo encontrar el producto: ${error}`);
    }
}

// Eliminar un producto (DELETE).

async function eliminarProducto(id) {
    try {
        const response = await fetch(`${url}${id}`,{
            method : 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error${response.status}`);
        }

        const productoEliminado = await response.json();
        console.log('\nProducto eliminado de la API:', productoEliminado);


    } catch(error) {
        console.log(`\nNo se pudo eliminar el producto ${error}`)
    }
};



async function main() {
    await getProductos();  // Recuperar todos
    await persistirDatos(); // Persistir datos
    await addProduct();   // Agregar nuevo
    await eliminarProducto(1); //eliminar producto
}

main();