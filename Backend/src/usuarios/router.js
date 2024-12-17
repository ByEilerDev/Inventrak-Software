const {Router} = require('express');
const controller = require('./index');

const router = Router();

router.post("/login", controller.login);

/*usuarios*/

router.post("/registrate", controller.registrate);

router.get("/obtener-usuario-en-sesion", controller.obtenerUsuarioSession);
router.put("/change-password", controller.changePassword);
router.get("/api/cerrar/session", controller.cerrarSession);

router.get("/api/leer/usuarios", controller.read);

module.exports = router;