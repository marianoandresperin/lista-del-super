class Articulo {
    constructor(nombre, seccion) {
        this.nombre = nombre.toLowerCase();
        this.seccion = seccion.toLowerCase();
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
    $('#supermercado-list').slideDown("2000");
}

// AGREGA ARTICULOS AL ARRAY A TRAVES DEL INPUT DEL FORM
function agregarArticulo(evt) {
    evt.preventDefault();
    let obtenerDato = $(evt.target).children();
    if (obtenerDato[0].value === "") {
        $("#errorArticulo").slideDown("fast", function() {
            $("#errorArticulo").delay(1000)
            $("#errorArticulo").slideUp("fast");
        });
        $("#articulo").focus();
    }else if (obtenerDato[1].value === "") {
        $("#errorSeccion").slideDown("fast", function() {
            $("#errorSeccion").delay(1000)
            $("#errorSeccion").slideUp("fast");
        });
        $("#seccion").focus();
    }else {
    guardar("arrayArticulosJSON", JSON.stringify(articulos));
    articulos.push(new Articulo (`${obtenerDato[0].value}`,`${obtenerDato[1].value}`));
    $("#success").slideDown("fast", function() {
        $("#success").delay(1000)
        $("#success").slideUp("fast");
    });
    clearInputs();
    }
    // LO UTILIZO PARA MIRAR COMO EL EVENTO ACTUALIZA EL ARRAY
    console.table(articulos)
    // LIMPIO EL INPUT Y LO VUELVO A PONER EN FOCUS PARA SEGUIR LISTANDO ARTICULOS
    function clearInputs() {
        $("#articulo").val("");
        $("#seccion").val("");
        $("#articulo").focus();
    }
    // INVOCO LA FUNCION QUE AGREGA LOS ARTICULOS AL HTML
    impresionArticulos();
    $(".submit-btn").fadeOut("fast", function() {
        $(".submit-btn").fadeIn("fast");
    });
    
}

// ELIMINA TODOS LOS ARTICULOS DE LA LISTA Y DEL ARRAY
function limpiarArticulos() {
    articulos.splice(0, articulos.length);
    guardar("arrayArticulosJSON", JSON.stringify(articulos));
    impresionArticulos();
    // LO UTILIZO PARA MIRAR COMO EL EVENTO ACTUALIZA EL ARRAY
    console.table(articulos);
    $("#limpiar-btn").fadeOut("fast", function() {
        $("#limpiar-btn").fadeIn("fast");
    });
}

