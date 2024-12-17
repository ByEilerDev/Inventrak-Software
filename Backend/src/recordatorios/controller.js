const {v4: uuidv4} = require("uuid");
const {exec} = require("../utils/exec-db");

async function create(req, res) {
    const {nombre, descripcion} = req.body;

    if (nombre.length == 0 || nombre.length >= 256) {
        res.status(400).json({
            message: 'el nombre debe ser menor de 255 carácteres'
        })
        return;
    }

    if (descripcion.length == 0 || descripcion.length >= 256) {
        res.status(400).json({
            message: 'la descripcion debe ser menor de 256 carácteres'
        })
        return;
    }
    
    try {
        await exec('INSERT INTO recordatorios (id, nombre, descripcion) VALUES (?,?,?) ', [
                uuidv4(),
                nombre,
                descripcion
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
            (await exec("SELECT * FROM recordatorios")).result
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
            (await exec("SELECT * FROM recordatorios WHERE id = ?", [sId])).result
        )
    } catch (error) {
        res.status(500).json({
            message: 'ha ocurrido un error interno porfavor intentelo más tarde'
        })
    }
}

async function update(req, res) {
    const sId = req.params.id;
    const {nombre, descripcion} = req.body;

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

    if (descripcion.length == 0 || descripcion.length >= 256) {
        res.status(400).json({
            message: 'la dirección debe ser menor de 256 carácteres'
        })
        return;
    }

    try {
        await exec('UPDATE recordatorios SET nombre = ?, descripcion = ? WHERE id = ?', [
                nombre,
                descripcion,
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
        await exec('DELETE FROM recordatorios WHERE id = ?', [
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