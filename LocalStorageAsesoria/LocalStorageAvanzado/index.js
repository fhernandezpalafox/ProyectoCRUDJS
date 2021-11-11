function agregarElementos() {

    var nombre  =  document.getElementById("txtNombre").value;
    var apellidos = document.getElementById("txtApellidos").value;
    var profesion = document.getElementById("cmbProfesion").value;
    
    //https://nakupanda.github.io/bootstrap3-dialog/

    if(nombre === "" || apellidos === ""){
        BootstrapDialog.show({
            message: 'Ningún campo debe estar vacío'
        });
    }

   //Editando
    
   var id =  document.getElementById("hdnid").value;

   if (id !== "") {
       
    var objpersona  = {
        id: id,
        nombre: nombre,
        apellidos: apellidos,
        profesion: profesion
    }

   }else {
         //Nuevo 
        var objpersona  = {
            id: uuidv4(),
            nombre: nombre,
            apellidos: apellidos,
            profesion: profesion
        }
   }
    
    //var lista = [];

    localStorage.setItem("persona",JSON.stringify(objpersona));

       //Refresca la pantalla
    window.location.reload();

}

window.onload  =  function() {
    
   var  objetoPersona  = localStorage.getItem("persona");

   if (objetoPersona !== null) {
      
      var objPersonaParse  =  JSON.parse(objetoPersona);
        
        var templateTr  = `<tr>
                            <td>${objPersonaParse.nombre}</td>
                            <td>${objPersonaParse.apellidos}</td>
                            <td>${objPersonaParse.profesion}</td>
                            <td> <button class='btn btn-primary' onclick='EditarPersona("${objPersonaParse.id}")'>Editar</button> </td>
                            <td> <button class='btn btn-danger' onclick='eliminarPersona("${objPersonaParse.id}")'>Eliminar</button> </td>
                        </tr>`;

        var tbodyPersona = document.getElementById("tbodyPersona"); 
          tbodyPersona.innerHTML = templateTr;               

   }
}

function EditarPersona(id) {

    var  objetoPersona  = localStorage.getItem("persona");
    if (objetoPersona !== null) {
        var objPersonaParse  =  JSON.parse(objetoPersona);
        
        if(objPersonaParse.id === id){
            document.getElementById("txtNombre").value = objPersonaParse.nombre;
            document.getElementById("txtApellidos").value = objPersonaParse.apellidos;
            document.getElementById("cmbProfesion").value = objPersonaParse.profesion;

            document.getElementById("hdnid").value = id;
        }
      

    }

    
    
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function eliminarPersona(id) {

    BootstrapDialog.show({
        title: 'Eliminar datos',
        message: '¿Deseas eliminar este elemento?',
        buttons: [{
            label: 'Cancelar',
            action: function(dialog) {
                dialog.close();
            }
        }, {
            label: 'Aceptar',
            action: function(dialog) {
                localStorage.removeItem('persona');
                window.location.reload();
            }
        }]
    });
    
}
