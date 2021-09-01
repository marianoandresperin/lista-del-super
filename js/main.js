// SELECCIONAR ELEMENTOS HTML
const form = document.querySelector('#form')
const list = document.querySelector('#supermercado-list')
const limpiar = document.querySelector('#limpiar-btn')
const input = document.querySelector('#input')

class Articulo {
    constructor(nombre) {
        this.nombre = nombre.toUpperCase();
    }
}

const articulos = []

const recuperar = JSON.parse(localStorage.getItem("arrayArticulosJSON"));

for (let objeto of recuperar){
    articulos.push(new Articulo (`${objeto.nombre}`));
}

impresionArticulos();

const guardar = (k, v) => {localStorage.setItem(k, v)};

form.addEventListener("submit", agregarArticulo);

limpiar.addEventListener("click", limpiarArticulos);

// FUNCION PARA LIMPIAR LOS ARTICULOS DEL HTML
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// FUNCION PARA "ACTUALIZAR" LOS ARTICULOS DE LA LISTA
function impresionArticulos(){
    removeAllChildNodes(list);
    for (let i = 0; i < articulos.length; i++){
        const element = document.createElement('article');
        element.classList.add('supermercado-item')
        element.innerHTML = `<h5 class="item-title">${articulos[i].nombre}</h5>`;                        
        list.appendChild(element);
    }
}

// AGREGA ARTICULOS AL ARRAY A TRAVES DEL INPUT DEL FORM
function agregarArticulo(evt) {
    evt.preventDefault();
    let obtenerDato = form[0].value;
    articulos.push(new Articulo (`${obtenerDato}`));
    guardar("arrayArticulosJSON", JSON.stringify(articulos));
    // LO UTILIZO PARA MIRAR COMO ACTUALIZA EL EVENTO ACTUALIZA EL ARRAY
    console.table(articulos)
    // LIMPIO EL INPUT Y LO VUELVO A PONER EN FOCUS PARA SEGUIR LISTANDO ARTICULOS
    function clearInput() {
        input.value="";
        input.focus();
    }
    clearInput();
    // INVOCO LA FUNCION QUE AGREGA LOS ARTICULOS AL HTML
    impresionArticulos();
}

// ELIMINA TODOS LOS ARTICULOS DE LA LISTA Y DEL ARRAY
function limpiarArticulos() {
    articulos.splice(0, articulos.length);
    guardar("arrayArticulosJSON", JSON.stringify(articulos));
    impresionArticulos();
    // LO UTILIZO PARA MIRAR COMO ACTUALIZA EL EVENTO ACTUALIZA EL ARRAY
    console.table(articulos);
}