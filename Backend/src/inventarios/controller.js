const {v4: uuidv4} = require("uuid");
const {exec} = require("../utils/exec-db");

async function create(req, res) {
    const {nombre} = req.body

    if (nombre.length == 0 || nombre.length >= 256) {
        res.status(400).json({
            message: 'el nombre debe ser menor de 256 carácteres'
        })
        return;
    }
    try {
        await exec('INSERT INTO inventarios (id, nombre) VALUES (?,?) ', [
                uuidv4(),
                nombre
            ]
        )
        res.status(200).json({
            message: 'se ha creado el inventario con exito'
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
            (await exec("SELECT * FROM inventarios")).result
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
            (await exec("SELECT * FROM inventarios WHERE id = ?", [sId])).result
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

    const {nombre} = req.body

    if (nombre.length == 0 || nombre.length >= 256) {
        res.status(400).json({
            message: 'el nombre debe ser menor de 256 carácteres'
        })
        return;
    }

    try {
        await exec('UPDATE inventarios set nombre = ? WHERE id = ?', [
                nombre,
                sId
            ]
        )
        res.status(200).json({
            message: 'se ha actualizado el inventario con exito'
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
        await exec('DELETE FROM inventarios WHERE id = ?', [
                sId
            ]
        )
        
        res.status(200).json({
            message: 'se ha eliminado un inventario con exito'
        });
    } catch (error) {
        res.status(500).json({
            message: 'El inventario ya se encuentra en uso'
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