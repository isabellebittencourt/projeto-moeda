//Iniciando a rota:
const router = require("express").Router();
const moedaController = require('../controller/moedaController');

const moedaCrl = new moedaController();

//INSERT:
router.post("/register", moedaCrl.doCreateMoeda);
//UPDATE:
router.put("/:id", moedaCrl.doUpdateMoeda);
//DELETE:
router.delete("/:id", moedaCrl.doDeleteMoeda);
//GET
router.get("/",moedaCrl.doListMoedas)


module.exports = router