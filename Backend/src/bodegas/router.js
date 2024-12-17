const {Router} = require('express');
const controller = require('./index');

const router = Router();

router.post("/api/crear/bodegas", controller.create);
router.get("/api/leer/bodegas", controller.read);
router.get("/api/leer/bodegas/:id", controller.read);
router.put("/api/actualizar/bodegas/:id", controller.update);
router.delete("/api/eliminar/bodegas/:id", controller.deleteById);

module.exports = router;