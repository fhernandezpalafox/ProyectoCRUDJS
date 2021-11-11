function agregarElemento() {
    
 var nombre  =  document.getElementById("txtNombre").value;

 localStorage.setItem('keynombre', nombre);
     

}


function mostrarElemento() {
    
    var dato = localStorage.getItem('keynombre');

    console.log(dato);

    if(dato !== null){
        document.getElementById("txtNombre").value  = dato;
    }else {
        alert("No hay nada que mostrar");
    } 
    
}


function eliminarElemento() {

    localStorage.removeItem('keynombre');
}