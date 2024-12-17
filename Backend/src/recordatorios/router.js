const {Router} = require('express');
const controller = require('./index');

const router = Router();

router.post("/api/crear/recordatorio", controller.create);
router.get("/api/leer/recordatorio", controller.read);
router.get("/api/leer/recordatorio/:id", controller.read);
router.put("/api/actualizar/recordatorio/:id", controller.update);
router.delete("/api/eliminar/recordatorio/:id", controller.deleteById);

module.exports = router;