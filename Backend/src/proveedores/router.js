const {Router} = require('express');
const controller = require('./index');

const router = Router();

router.post("/api/crear/proveedor", controller.create);
router.get("/api/leer/proveedores", controller.read);
router.get("/api/leer/proveedores/:id", controller.readById);
router.put("/api/actualizar/proveedores/:id", controller.update);
router.delete("/api/eliminar/proveedores/:id", controller.deleteById);

module.exports = router;