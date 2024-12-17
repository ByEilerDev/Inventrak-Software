const mysql = require('mysql2');
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');

const app = express();

const BodegaServices = require('./src/bodegas/router');
const InventarioServices = require('./src/inventarios/router');
const ProductoServices = require('./src/productos/router');
const ProveedorServices = require('./src/proveedores/router');
const TiendaServices = require('./src/tiendas/router');
const UsuarioServices = require('./src/usuarios/router');
const RecordatorioServices = require('./src/recordatorios/router');

app.use(bodyParser.json());

app.use(cors({
    //origin: "http://localhost:4200/",
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    maxAge: 3600,
    credentials: true,
    preflightContinue: true,
    origin: function (_sOrigin, callback) {
        callback(null, true);
    },
}));

app.use(session({
    secret: 'd_ZHMa7;N;Vri9i8NY"PzOCzf:g"£oh>2azk30e[b~8faQzYnU',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));


/*bodegas*/
app.use(BodegaServices);

/*inventarios*/
app.use(InventarioServices);

/*productos*/
app.use(ProductoServices);

/*proveedores*/
app.use(ProveedorServices);

/*tiendas*/
app.use(TiendaServices);

/*usuarios*/
app.use(UsuarioServices);

app.use(RecordatorioServices);

async function main() {
    try {
        console.log("creando conexión a la base de datos")

        conexion = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            database: "inventrak_web"
        })

        console.log("se ha creado la conexion con exito");
    } catch (error) {
        console.log("ha ocurrido un error al conectar la base de datos", error);
    }

    if (conexion != null) {
        app.listen(4000);
    }
}

main();
