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
        console.log("Productos obtenidos:", datos);
        
    } catch (error) {
        console.log('Ocurrió un error:', error.message);
    }
}

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
        console.log("Producto agregado a la API:", data);

    } catch (err) {
        console.error("No se pudo agregar el producto:", err.message);
    }
}

async function main() {
    await getProductos();  // Recuperar todos
    await addProduct();   // Agregar nuevo
}

main();
