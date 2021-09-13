class Articulo {
    constructor(nombre, seccion) {
        this.nombre = nombre.toUpperCase();
        this.seccion = seccion.toUpperCase();
    }
}

const articulos = []

const recuperar = JSON.parse(localStorage.getItem("arrayArticulosJSON"));

// AGREGO UN IF PORQUE AL PRINCIPIO NO HAY NADA CARGADO
if (recuperar) for (let objeto of recuperar){
    articulos.push(new Articulo (`${objeto.nombre}`, `${objeto.seccion}`));
}

impresionArticulos();

const guardar = (k, v) => {localStorage.setItem(k, v)};

$('#form').on("submit", agregarArticulo);

$('#limpiar-btn').on("click", limpiarArticulos);

// FUNCION PARA "ACTUALIZAR" LOS ARTICULOS DE LA LISTA
function impresionArticulos(){
    $('#supermercado-list').empty();
    // ENCABEZADO DE LOS ARTICULOS Y SECCION
    $('#supermercado-list').append(`<div class="row justify-content-between px-3">
                                        <h5 class="bar-title">Artículo</h5>
                                        <h5 class="bar-section">Sección</h5>
                                    </div>`);
    for (let i = 0; i < articulos.length; i++){
        $('#supermercado-list').append(`<div class="row justify-content-between px-3">
                                            <h5 class="item-title">${articulos[i].nombre}</h5>
                                            <h5 class="item-section">${articulos[i].seccion}</h5>
                                        </div>`);
    }
}

// AGREGA ARTICULOS AL ARRAY A TRAVES DEL INPUT DEL FORM
function agregarArticulo(evt) {
    evt.preventDefault();
    let obtenerDato = $(evt.target).children();
    articulos.push(new Articulo (`${obtenerDato[0].value}`,`${obtenerDato[1].value}`));
    guardar("arrayArticulosJSON", JSON.stringify(articulos));
    // LO UTILIZO PARA MIRAR COMO EL EVENTO ACTUALIZA EL ARRAY
    console.table(articulos)
    // LIMPIO EL INPUT Y LO VUELVO A PONER EN FOCUS PARA SEGUIR LISTANDO ARTICULOS
    function clearInputs() {
        $("#articulo").val("");
        $("#seccion").val("");
        $("#articulo").focus();
    }
    clearInputs();
    // INVOCO LA FUNCION QUE AGREGA LOS ARTICULOS AL HTML
    impresionArticulos();
}

// ELIMINA TODOS LOS ARTICULOS DE LA LISTA Y DEL ARRAY
function limpiarArticulos() {
    articulos.splice(0, articulos.length);
    guardar("arrayArticulosJSON", JSON.stringify(articulos));
    impresionArticulos();
    // LO UTILIZO PARA MIRAR COMO EL EVENTO ACTUALIZA EL ARRAY
    console.table(articulos);
}