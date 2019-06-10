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
var tabla = document.getElementById('tabla');
db.collection("cliente").onSnapshot((querySnapshot) => {
    tabla.innerHTML = "";
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML += `
        <tr>
            <td>${doc.data().nombre}</td>
            <td>${doc.data().apellido}</td>
            <td>${doc.data().email}</td>
        </tr>
        `
    });
});