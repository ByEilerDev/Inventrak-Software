const {Router} = require('express');
const controller = require('./index');
const multer = require("multer");
const path = require('path');
const fs = require('fs');

const router = Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post("/api/crear/producto", controller.create);
router.get("/api/leer/productos", controller.read);
router.get("/api/exportar/productos", controller.exportarExcel);
router.post("/api/importar/productos", upload.single('file'), controller.importarExcel);
router.get("/api/leer/productos/inventario/:id", controller.readByInventario);
router.get("/api/leer/productos/reporte", controller.readByReporte);
router.get("/api/leer/productos/mas-vendidos", controller.readMasVendidos)
router.post("/api/vender/producto/:id", controller.updateVenta)
router.get("/api/leer/productos/averias", controller.readByAverias);
router.put("/api/actualizar/productos/:id", controller.update);
router.delete("/api/eliminar/productos/:id", controller.deleteById);

module.exports = router;