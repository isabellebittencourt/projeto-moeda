//Iniciando a rota:
const router = require("express").Router();
//recuperando o model de moeda:
const Moeda = require("../models/Moeda");

//INSERT:
router.post("/register", async(req,res)=>{
    try{
        const newMoeda = new Moeda({
            moedaOrigem: req.body.moedaOrigem,
            moedaConvercao : req.body.moedaConvercao,
            valorMoeda : req.body.valorMoeda,
            valorMoedaInteiro : req.body.valorMoedaInteiro,
            valorMoedaConvertida :req.body.valorMoedaConvertida
        });
        //salvando no banco:
        const moeda = await newMoeda.save();
        //se tudo der certo:
        res.status(200).json(moeda)
    }catch(err){
        res.status(500).json(err)
    }
});

//UPDATE:
router.put("/:id", async (req,res)=>{
  
        try{
            const updateMoeda = await Moeda.findByIdAndUpdate(req.params.id,{
                $set : req.body
            },{new:true});
            res.status(200).json(updateMoeda);
        }catch(err){
            res.status(500).json(err)
        }

});

//DELETE:
router.delete("/:id", async (req,res)=>{
        try{
               await Moeda.findByIdAndDelete(req.params.id);
               res.status(200).json("Dados deletado com sucesso!");
        }catch(err){
            res.status(500).json(err)
        }
});

//GET :
router.get("/", async (req,res)=>{
        try{
               let moedas = await Moeda.find();
               res.status(200).json(moedas);
        }catch(err){
            res.status(500).json(err)
        }
});

module.exports = router