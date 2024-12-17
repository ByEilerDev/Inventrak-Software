const {v4: uuidv4} = require("uuid");
const {exec} = require("../utils/exec-db");

async function create(req, res) {
    const {nombre, direccion, encargadoTienda, telefono} = req.body

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


    if (encargadoTienda.length == 0 || encargadoTienda.length >= 256) {
        res.status(400).json({
            message: 'el parametro encargado de tienda no debe ser menor de 256 carácteres'
        })
        return;
    }


    if (typeof telefono != 'number') {
        res.status(400).json({
            message: 'en telefono se deben ingresar numeros'
        })
        return;
    }


    try {
        await exec('INSERT INTO tiendas (id, nombre, direccion, encargado_tienda, telefono) VALUES (?,?,?,?, ?) ', [
                uuidv4(),
                nombre,
                direccion,
                encargadoTienda,
                telefono


            ]
        )
        res.status(200).json({
            message: 'se ha creado la tienda con exito'
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
            (await exec("SELECT * FROM tiendas")).result
        )
    } catch (error) {
        res.status(500).json({
            message: 'ha ocurrido un error interno porfavor intentelo más tarde'
        })
    }
}

async function update(req, res) {
    const sId = req.params.id;

    if (sId.length != 36) {
        res.status(400).json({
            message: 'el id debe ser de 36 carácteres'
        })
        return;
    }

    const {nombre, direccion, encargadoTienda, telefono} = req.body

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


    if (encargadoTienda.length == 0 || encargadoTienda.length >= 256) {
        res.status(400).json({
            message: 'el parametro encargado de tienda no debe ser menor de 256 carácteres'
        })
        return;
    }


    if (typeof telefono != 'number') {
        res.status(400).json({
            message: 'en telefono se deben ingresar numeros'
        })
        return;
    }


    try {
        await exec('UPDATE tiendas set nombre = ?, direccion = ?, encargado_tienda = ?, telefono = ? WHERE id = ?', [
                nombre,
                direccion,
                encargadoTienda,
                telefono,
                sId
            ]
        )
        res.status(200).json({
            message: 'se ha actualizado la tienda con exito'
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
        await exec('DELETE FROM tiendas WHERE id = ?', [
                sId
            ]
        )
        
        res.status(200).json({
            message: 'se ha eliminado la tienda con exito'
        });
    } catch (error) {
        res.status(500).json({
            message: 'La tienda ya se encuentra en uso'
        });
    }

}

module.exports = {
    create,
    read,
    update,
    deleteById
}