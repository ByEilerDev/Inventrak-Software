const {v4: uuidv4} = require("uuid");
const {exec} = require("../utils/exec-db");

async function create(req, res) {
    const {nombre, direccion, telefono, correoElectronico, gerenteBodega, capacidadAlmacenamiento} = req.body;

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
    if (typeof telefono != 'number') {
        res.status(400).json({
            message: 'en telefono se deben ingresar numeros'
        })
        return;
    }

    if (correoElectronico.length > 255) {
        res.json({
            message: "el correo no debe ser mayor a 255 caracteres"
        });
        return;
    }

    if (gerenteBodega.length == 0 || gerenteBodega.length >= 256) {
        res.status(400).json({
            message: 'el parametro  no debe ser menor de 256 carácteres'
        })
        return;
    }


    if (typeof capacidadAlmacenamiento != 'number') {
        res.status(400).json({
            message: 'en telefono se deben ingresar numeros'
        })
        return;
    }


    try {
        await exec('INSERT INTO bodegas (id, nombre, direccion, telefono, correo_electronico, gerente_de_la_bodega, capacidad_de_almacenamiento_m3) VALUES (?,?,?,?,?,?,?) ', [
                uuidv4(),
                nombre,
                direccion,
                telefono,
                correoElectronico,
                gerenteBodega,
                capacidadAlmacenamiento


            ]
        )
        res.status(200).json({
            message: 'se ha creado la bodega con exito'
        })
    } catch (error) {
        res.status(500).json({
            message: 'ha ocurrido un error interno porfavor intentelo más tarde'
        })
    }

}

async function read(req, res) {
    try {
        res.status(200).json(
            (await exec("SELECT * FROM bodegas")).result
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
            (await exec("SELECT * FROM bodega WHERE id = ?", [sId])).result
        )
    } catch (error) {
        res.status(500).json({
            message: 'ha ocurrido un error interno porfavor intentelo más tarde'
        })
    }
}

async function update(req, res) {
    const sId = req.params.id;
    const {nombre, direccion, telefono, correoElectronico, gerenteBodega, capacidadAlmacenamiento} = req.body;

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
    if (typeof telefono != 'number') {
        res.status(400).json({
            message: 'en telefono se deben ingresar numeros'
        })
        return;
    }

    if (correoElectronico.length > 255) {
        res.json({
            message: "el correo no debe ser mayor a 255 caracteres"
        });
        return;
    }

    if (gerenteBodega.length == 0 || gerenteBodega.length >= 256) {
        res.status(400).json({
            message: 'el parametro  no debe ser menor de 256 carácteres'
        })
        return;
    }


    if (typeof capacidadAlmacenamiento != 'number') {
        res.status(400).json({
            message: 'en telefono se deben ingresar numeros'
        })
        return;
    }


    try {
        await exec('UPDATE bodegas SET nombre = ?, direccion = ?, telefono = ?, correo_electronico = ?, gerente_de_la_bodega = ?, capacidad_de_almacenamiento_m3 =? WHERE id = ?', [
                nombre,
                direccion,
                telefono,
                correoElectronico,
                gerenteBodega,
                capacidadAlmacenamiento,
                sId
            ]
        )

        res.status(200).json({
            message: 'se ha actualizado la bodega con exito'
        });
    } catch (error) {
        res.status(500).json({
            message: 'ha ocurrido un error interno porfavor intentelo más tarde'
        });
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
        await exec('DELETE FROM bodegas WHERE id = ?', [
                sId
            ]
        )
        
        res.status(200).json({
            message: 'se ha eliminado la bodega con exito'
        });
    } catch (error) {
        res.status(500).json({
            message: 'La bodega ya se encuentra en uso'
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