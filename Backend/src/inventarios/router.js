const {Router} = require('express');
const controller = require('./index');

const router = Router();

router.post("/api/crear/inventario", controller.create);
router.get("/api/leer/inventarios", controller.read);
router.get("/api/leer/inventarios/:id", controller.readById);
router.put("/api/actualizar/inventarios/:id", controller.update);
router.delete("/api/eliminar/inventarios/:id", controller.deleteById);

module.exports = router;