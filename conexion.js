//Inicia Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCnmitNcY7pbQAcdqOaOoEkNx32qYUTjWo",
    authDomain: "veterinaria-5d3c7.firebaseapp.com",
    projectId: "veterinaria-5d3c7"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//Agregar un mensaje de contacto
function agregarMensaje() {

    var nom = document.getElementById('nombre').value;
    var ape = document.getElementById('apellido').value;
    var eml = document.getElementById('email').value;
    var text = document.getElementById('textarea1').value;

    if (nom == "" || ape == "" || eml == "" || text == "") {
        alert("Campos vacios");

    } else {
        db.collection("contacto").add({
            nombre: nom,
            apellido: ape,
            email: eml,
            mensaje: text
        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                alert("Mensaje enviado");
                document.getElementById('nombre').value = "";
                document.getElementById('apellido').value = "";
                document.getElementById('email').value = "";
                document.getElementById('textarea1').value = "";
            })
            .catch(function (error) {
                alert("No se envio el mensaje");
                console.error("Error adding document: ", error);
            });
    }

}
//Agregar un cliente
function guardar() {

    var nom = document.getElementById('nombre').value;
    var ape = document.getElementById('apellido').value;
    var pass = document.getElementById('password').value;
    var eml = document.getElementById('email').value;

    if (nom == "" || ape == "" || eml == "" || pass == "") {
        alert("Campos vacios");

    } else {
        db.collection("cliente").add({
            nombre: nom,
            apellido: ape,
            contraseña: pass,
            email: eml
        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                alert("Registrado exitosamente!");
                document.getElementById('nombre').value = "";
                document.getElementById('apellido').value = "";
                document.getElementById('password').value = "";
                document.getElementById('email').value = "";
            })
            .catch(function (error) {
                alert("No se registro");
                console.error("Error adding document: ", error);
            });
    }

}
//leer datos
function buscar() {
    var tabla = document.getElementById('tabla');
    var pass1 = document.getElementById('password1').value;
    var eml1 = document.getElementById('email1').value;
    db.collection("cliente").onSnapshot((querySnapshot) => {
        tabla.innerHTML = "";
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            if (eml1 == `${doc.data().email}` && pass1 == `${doc.data().contraseña}`) {
                tabla.innerHTML += `
            <tr>
                <td>${doc.data().nombre}</td>
                <td>${doc.data().apellido}</td>
                <td>${doc.data().email}</td>
<<<<<<< HEAD
                <td><button onclick="muestraInput()" class="btn waves-effect teal darken-1">Modificar</button></td>
            </tr>
            `
            }
        });
    });
}
function muestraInput() {
    var muestra = document.getElementById('muestra');
    muestra.innerHTML += `
    <div class="row">
        <div class="input-field col s6">
            <input id="nombre" type="text" class="validate white-text">
            <label for="first_name" class="white-text">Nombre</label>
        </div>
        <div class="input-field col s6">
            <input id="apellido" type="text" class="validate white-text">
            <label for="last_name" class="white-text">Apellido</label>
        </div>
    </div>
    <div class="row">
        <div class="input-field col s6">
            <input id="email1" type="email" class="validate white-text">
            <label for="email" class="white-text">Email</label>
        </div>
        <div class="input-field col s6">
            <input id="password1" type="password" class="validate white-text">
            <label for="password" class="white-text">Password</label>
        </div>
    </div>
    <button onclick="" class="btn waves-effect teal darken-1">Modificar</button>
    `
}


//eliminar

function buscar1() {
    var tabla = document.getElementById('tabla2');
    var pass2 = document.getElementById('password2').value;
    var eml2 = document.getElementById('email2').value;
    db.collection("cliente").onSnapshot((querySnapshot) => {
        tabla.innerHTML = "";
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            if (eml2 == `${doc.data().email}` && pass2 == `${doc.data().contraseña}`) {
                tabla.innerHTML += `
            <tr>
                <td>${doc.data().nombre}</td>
                <td>${doc.data().apellido}</td>
                <td>${doc.data().email}</td>
                <td>  <button onclick="eliminar('${doc.id}')" class="btn waves-effect teal darken-1">Eliminar</button> </td>
            </tr>
            `
            }
        });
    });
}

//borrar documentos
function eliminar(id){
    db.collection("cliente").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
=======
            </tr>
            `
            }else{
                alert("No se pudo encontrar");
            }

        });
    });
>>>>>>> 655d3803d900644a0afe1e1cf521e06218bb5a01
}