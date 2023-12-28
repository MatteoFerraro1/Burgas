let articulosCarrito = [];

const contenedorCarrito = document.querySelector("#tablaCarrito tbody")

let listaProductos = document.querySelector("#listaProductos")

const vaciarCarrito = document.querySelector("#vaciarCarrito")

const carrito = document.querySelector("#divTabla")

function agregarProducto(evt){
    evt.preventDefault();
    if(evt.target.classList.contains("agregarCarrito")){
     const producto = evt.target.parentElement.parentElement.parentElement
     leerDatosProducto(producto)
    }
}

function leerDatosProducto(item){
    const infoProducto = {
        imagen:item.querySelector("img").src,
        titulo:item.querySelector("h3").textContent,
        precio:item.querySelector(".precio").textContent,
        id:item.querySelector("form").getAttribute("data-id"),
        cantidad: 1
    };
    
    if(articulosCarrito.some((prod) => prod.id === infoProducto.id)){
        const productos = articulosCarrito.map(producto => {
            if(producto.id===infoProducto.id){
                let cantidad= parseInt(producto.cantidad)
                cantidad+=1;
                producto.cantidad= cantidad;
                return producto
            } else{
                return producto
            }
        });
        articulosCarrito = [...productos]
    }else{
        articulosCarrito = [...articulosCarrito, infoProducto]
    }
    
    dibujarcarritoHTML()
}

function dibujarcarritoHTML(){
    limpiarCarrito()
    articulosCarrito.forEach((producto) => {
        const fila = document.createElement("tr")
        fila.innerHTML = `
        <td"><img src="${producto.imagen}" class="imgProducto"/></td>
        <td>"${producto.titulo}"</td>
        <td>"${producto.precio}"</td>
        <td>"${producto.cantidad}"</td>
        <td><a class="borrarProducto" data-id="${producto.id}" href="#"><img src="../assets/icon/X.ico" width="15px" alt=""></a></td>
        `;
        contenedorCarrito.appendChild(fila);
    });
    sincronizarStorage();

}
function limpiarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)    
    }
    
}
function eliminarProducto(evt){
    evt.preventDefault();
    if(evt.target.classList.contains("borrarProducto")){
        const producto = evt.target.parentElement.parentElement;
        const productoId = producto.querySelector("a").getAttribute("data-id");
        articulosCarrito = articulosCarrito.filter(
            (producto) => producto.id !== productoId);
        dibujarcarritoHTML();
    }
    
}

function sincronizarStorage(){
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito))
}

listaProductos.addEventListener("click", agregarProducto)
carrito.addEventListener("click", eliminarProducto)
vaciarCarrito.addEventListener("click", limpiarCarrito)
window.addEventListener("DOMContentLoaded", ()=>{
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    dibujarcarritoHTML();
} )