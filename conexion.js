//Inicia Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCnmitNcY7pbQAcdqOaOoEkNx32qYUTjWo",
    authDomain: "veterinaria-5d3c7.firebaseapp.com",
    projectId: "veterinaria-5d3c7"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// sesion

function ingreso() {

    var emlAdm = document.getElementById('emailAdm').value;
    var passAdm = document.getElementById('passwordAdm').value;

    firebase.auth().signInWithEmailAndPassword(emlAdm, passAdm)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            alert(" Los datos son erroneos!!");

            // ...
        });
}

function salir() {

    var tabla = document.getElementById('tablaC');
    var cabeza = document.getElementById('cabeza');

    firebase.auth().signOut().then(function () {

        tabla.innerHTML = "";
        cabeza.innerHTML = "";
        // Sign-out successful.
        
    }).catch(function (error) {
        // An error happened.
    });
}

function observador() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            console.log("si hay");
            aparece()

            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
        } else {
            // User is signed out.
            console.log("no hay");
            // ...
        }
    });


} observador();

function aparece() {
    {
        var tabla = document.getElementById('tablaC');
        var cabeza = document.getElementById('cabeza');
        cabeza.innerHTML += ` 

        <br><button onclick="salir()" class="btn waves-effect teal darken-1"> Salir </button>
        
        <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Email</th>
        <th>Mascota</th>
        <th>Especie</th>
        <th>Mensaje</th>
        </tr>
        `
        db.collection("consulta").onSnapshot((querySnapshot) => {
            tabla.innerHTML = "";
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`); {
                    tabla.innerHTML += `
                <tr>
                    <td>${doc.data().nombre}</td>
                    <td>${doc.data().apellido}</td>
                    <td>${doc.data().email}</td>
                    <td>${doc.data().nombreMascota}</td>
                    <td>${doc.data().especie}</td>
                    <td>${doc.data().mensaje}</td>
                   
                </tr>
                
                `
                }

    
            });
        });
    }

}

//Agregar un mensaje de contacto
function agregarMensaje() {

    var nom = document.getElementById('nombre').value;
    var ape = document.getElementById('apellido').value;
    var eml = document.getElementById('email').value;
    var esp = document.getElementById('especie').value;
    var edad = document.getElementById('edad').value;
    var nomM = document.getElementById('nombreM').value;
    var text = document.getElementById('textarea1').value;

    if (nom == "" || ape == "" || eml == "" || text == "") {
        alert("Campos vacios");

    } else {
        db.collection("consulta").add({
            nombre: nom,
            apellido: ape,
            email: eml,
            especie: esp,
            edad: edad,
            nombreMascota: nomM,
            mensaje: text

        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                alert("Mensaje enviado");
                document.getElementById('nombre').value = "";
                document.getElementById('apellido').value = "";
                document.getElementById('email').value = "";
                document.getElementById('especie').value = "";
                document.getElementById('edad').value = "";
                document.getElementById('nombreM').value = "";
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
                <td><button onclick="modificar('${doc.id}','${doc.data().nombre}',
                '${doc.data().apellido}','${doc.data().contraseña}','${doc.data().email}')" 
                class="btn waves-effect teal darken-1">Modificar</button></td>
            </tr>
            `
            }
        });
    });
}

//modificar
function modificar(id, nombre, apellido, contraseña, email) {

    document.getElementById('nombreM').value = nombre;
    document.getElementById('apellidoM').value = apellido;
    document.getElementById('passwordM').value = contraseña;
    document.getElementById('emailM').value = email;

    var boton = document.getElementById('boton');

    boton.onclick = function () {
        var nom = document.getElementById('nombreM').value;
        var ape = document.getElementById('apellidoM').value;
        var eml = document.getElementById('emailM').value;
        var pass = document.getElementById('passwordM').value;

        if (nom == "" || ape == "" || eml == "" || pass == "") {
            alert("Campos vacios");

        } else {
            var washingtonRef = db.collection("cliente").doc(id);

            // Set the "capital" field of the city 'DC'
            return washingtonRef.update({
                nombre: nom,
                apellido: ape,
                contraseña: pass,
                email: eml
            })
                .then(function () {
                    console.log("Document successfully updated!");
                    alert("Editado exitosamente!");
                    document.getElementById('nombreM').value = "";
                    document.getElementById('apellidoM').value = "";
                    document.getElementById('passwordM').value = "";
                    document.getElementById('emailM').value = ""
                    document.getElementById('password1').value = "";
                    document.getElementById('email1').value = "";

                    var tabla = document.getElementById('tabla');
                    tabla.innerHTML = "";

                    id = null;
                })
                .catch(function (error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });

        }
    }

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
function eliminar(id) {
    db.collection("cliente").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}