const {v4: uuidv4} = require("uuid");
const {exec} = require("../utils/exec-db");

async function create(req, res) {
    const {nombre, direccion, telefono, correoElectronico, personaContacto} = req.body

    if (nombre.length == 0 || nombre.length >= 256) {
        res.status(400).json({
            message: 'el nombre debe ser menor de 255 carácteres'
        })
        return;
    }

    if (direccion.length == 0 || direccion.length >= 256) {
        res.status(400).json({
            message: 'la dirección debe ser menor de 256 carácteres'
        })
        return;
    }

    if (correoElectronico.length > 255) {
        res.json({
            message: "el correo no debe ser mayor a 255 caracteres"
        });
        return;
    }

    if (typeof telefono != 'number') {
        res.status(400).json({
            message: 'en telefono se deben ingresar numeros'
        })
        return;
    }

    if (personaContacto.length == 0 || personaContacto.length >= 256) {
        res.status(400).json({
            message: 'el parametro personaContacto debe ser menor de 255 carácteres'
        })
        return;
    }

    try {
        await exec('INSERT INTO proveedores (id, nombre, direccion, telefono, correo_electronico, persona_de_contacto) VALUES (?,?,?,?,?,?) ',
            [
                uuidv4(),
                nombre,
                direccion,
                telefono,
                correoElectronico,
                personaContacto
            ]
        )
        res.status(200).json({
            message: 'se ha creado el proveedor con exito'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'ha ocurrido un error interno porfavor intentelo más tarde'
        })
    }

}

async function read(req, res) {
    try {
        res.status(200).json(
            (await exec("SELECT * FROM proveedores")).result
        )
    } catch (error) {
        res.status(500).json({
            message: 'ha ocurrido un error interno porfavor intentelo más tarde'
        })
    }
}

async function readById(req, res) {
    try {
        const sId = req.params.id;

        res.status(200).json(
            (await exec("SELECT * FROM proveedores WHERE id = ?", [sId])).result
        )
    } catch (error) {
        res.status(500).json({
            message: 'ha ocurrido un error interno porfavor intentelo más tarde'
        })
    }
}

async function update(req, res) {
    const sId = req.params.id;

    const {nombre, direccion, telefono, correoElectronico, personaContacto} = req.body;

    if (sId.length != 36) {
        res.status(400).json({
            message: 'el id debe ser de 36 carácteres'
        })
        return;
    }

    if (nombre.length == 0 || nombre.length >= 256) {
        res.status(400).json({
            message: 'el nombre debe ser menor de 255 carácteres'
        })
        return;
    }

    if (direccion.length == 0 || direccion.length >= 256) {
        res.status(400).json({
            message: 'la dirección debe ser menor de 256 carácteres'
        })
        return;
    }

    if (correoElectronico.length > 255) {
        res.json({
            message: "el correo no debe ser mayor a 255 caracteres"
        });
        return;
    }

    if (typeof telefono != 'number') {
        res.status(400).json({
            message: 'en telefono se deben ingresar numeros'
        })
        return;
    }

    if (personaContacto.length == 0 || personaContacto.length >= 256) {
        res.status(400).json({
            message: 'el parametro personaContacto debe ser menor de 255 carácteres'
        })
        return;
    }

    try {
        await exec('UPDATE proveedores set nombre = ?, direccion = ?, telefono = ?, correo_electronico = ?, persona_de_contacto =? WHERE id = ?',
            [
                nombre,
                direccion,
                telefono,
                correoElectronico,
                personaContacto,
                sId
            ]
        )
        res.status(200).json({
            message: 'se ha actualizado el proveedor con exito'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'ha ocurrido un error interno porfavor intentelo más tarde'
        })
    }

}

async function deleteById(req, res) {
    const sId = req.params.id;

    if (sId.length != 36) {
        res.status(400).json({
            message: 'el id debe ser de 36 carácteres'
        })
        return;
    }

    try {
        await exec('DELETE FROM proveedores WHERE id = ?', [
                sId
            ]
        )
        
        res.status(200).json({
            message: 'se ha eliminado el proveedor con exito'
        });
    } catch (error) {
        res.status(500).json({
            message: 'El proveedor ya se encuentra en uso'
        });
    }

}

module.exports = {
    create,
    read,
    update,
    deleteById,
    readById
}