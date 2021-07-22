var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Arreglo para reservaciones
var reservaciones = [{
    name: 'Victor',
    phone: '12345',
    email: 'victor@vmail.com',
    id: 1
}]

var waitList = []

//Creamos al menos una ruta
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "home.html"));
})

app.get("/tables", (req, res) => {
    res.sendFile(path.join(__dirname, "tables.html"));
})

app.get("/reserve", (req, res) => {
    res.sendFile(path.join(__dirname, "reserve.html"));
})

//Ver todas las rservaciones
app.get("/api/tables", function(req, res) {
    return res.json(reservaciones);
});

//Ver lista de espera
app.get("/api/waitlist", function(req, res) {
    return res.json(waitList);
});

//Creación de reservaciones
app.post("/api/reservations", function(req, res) {
    var newreservation = req.body;

    console.log(newreservation);
    if (reservaciones.length == 5) {
        waitList.push(newreservation);
    } else {
        reservaciones.push(newreservation);
    }
    res.json(newreservation);
})

//Inicializamos el servidor para que escucha en un puerto determinado
app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})