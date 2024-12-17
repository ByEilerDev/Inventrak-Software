const {Router} = require('express');
const controller = require('./index');

const router = Router();

router.post("/api/crear/tiendas", controller.create);
router.get("/api/leer/tiendas", controller.read);
router.put("/api/actualizar/tiendas/:id", controller.update);
router.delete("/api/eliminar/tiendas/:id", controller.deleteById);

module.exports = router;