const bcrypt = require("bcrypt");
const {v4: uuidv4} = require('uuid');
const {exec} = require("../utils/exec-db");

async function login(req, res) {
    const {username, password} = req.body;
    req.session.userEmail = null;
    req.session.userId = null;

    if (!(typeof username == "string" && typeof password == "string")) {
        res.json({
            message: "debe ingresar un correo y password valido"
        });
        return;
    }

    if (password.length < 8) {
        res.json({
            message: "la contraseña debe ser mayor o igual a 8 caracteres"
        });
        return;
    }
    if (password.length > 255) {
        res.json({
            message: "la contraseña no debe ser mayor a 255 caracteres"
        });
        return;
    }
    if (username.length > 255) {
        res.json({
            message: "el correo no debe ser mayor a 255 caracteres"
        });
        return;
    }

    try {
        const oUsuario = await exec("SELECT * FROM `usuarios` WHERE correo = ?;", [
            username
        ]);

        if (oUsuario.result.length == 0) {
            res.json({
                message: "El correo o la contraseña no son validos"
            });
            return;
        }

        if (username == oUsuario.result[0].correo && await bcrypt.compare(password, oUsuario.result[0].password)) {
            req.session.userEmail = username;
            req.session.userId = oUsuario.result[0].id;
            res.status(200).json({
                message: "ok"
            })
        } else {
            res.status(200).json({
                message: "El correo o la contraseña no son validos"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "a ocurrido un error al ejecutar la consulta en la base de datos "
        });
    }


}

async function registrate(req, res) {
    const {nombre, email, password, repeatPassword, telefono} = req.body;
    if (!(typeof nombre == "string" && typeof email == "string" && typeof password == "string" && typeof telefono == "string")) {
        res.json({
            message: "debe ingresar un nombre, email, password, telefono, valido"
        });
        return;
    }

    if (password != repeatPassword) {
        res.json({
            message: "las contraseñas no coinciden"
        });
        return;
    }

    if (password.length < 8) {
        res.json({
            message: "la contraseña debe ser mayor o igual a 8 caracteres"
        });
        return;
    }

    if (nombre.length > 255) {
        res.json({
            message: "el nombre no debe ser mayor a 255 caracteres"
        });
        return;
    }
    if (email.length > 255) {
        res.json({
            message: "el correo no debe ser mayor a 255 caracteres"
        });
        return;
    }
    if (telefono.length > 13) {
        res.json({
            message: "el numero no debe ser mayor a 13 caracteres"
        });
        return;
    }

    try {
        const oUsuario = await exec("select id from usuarios where correo=?", [email]);

        if (oUsuario.result.length > 0) {
            res.json({
                message: "usuario existente"
            });
            return;
        }

        await exec("INSERT INTO `usuarios` (`id`, `nombres`, `correo`, `password`, `telefono`) VALUES (?, ?, ?, ?, ?);", [
            uuidv4(),
            nombre,
            email,
            await bcrypt.hash(password, 15),
            telefono
        ])

        res.json({
            message: "el usuario ha sido guardado con exito"
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "a ocurrido un error al ejecutar la consulta en la base de datos "
        });
    }
}

async function obtenerUsuarioSession(req, res) {
    try {
        if(!req.session.userEmail){
            res.status(401).json({
                message: "no autorizado"
            });
            return;
        }
        const oUsuario = await exec('select id, nombres, correo, telefono FROM usuarios where correo = ?', [
            req.session.userEmail
        ]);
        if (oUsuario.result.length == 0) {
            res.status(401).json({
                message: "a ocurrido un error al consultar el usuario en sesion"
            })
        } else (
            res.json(oUsuario.result[0])
        )
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "a ocurrido un error al ejecutar en la base de datos"
        })
    }
}

async function changePassword(req, res) {
    try {
        const {password} = req.body;

        if(!req.session.userId){
            res.status(401).json({
                message: "no autorizado"
            });
            return;
        }
        const oUsuario = await exec('UPDATE usuarios set password = ? where id = ?', [
            await bcrypt.hash(password, 15),
            req.session.userId
        ]);
        if (oUsuario.result.length == 0) {
            res.status(401).json({
                message: "a ocurrido un error al consultar el usuario en sesion"
            })
        } else (
            res.json(oUsuario.result[0])
        )
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "a ocurrido un error al ejecutar en la base de datos"
        })
    }
}

async function cerrarSession(req, res) {
    try {
        req.session.userEmail = null;
        
        res.status(200).json({
            message: "Se ha cerrado la sesion"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "a ocurrido un error al ejecutar en la base de datos"
        })
    }
}

async function read(req, res) {
    try {
        res.status(200).json(
            (await exec("SELECT * FROM usuarios")).result
        )
    } catch (error) {
        res.status(500).json({
            message: 'ha ocurrido un error interno porfavor intentelo más tarde'
        })
    }
}

module.exports = {
    login,
    registrate,
    obtenerUsuarioSession,
    read,
    cerrarSession,
    changePassword
}