const mongoose = require('mongoose');
const Moeda = require("../models/Moeda");

class MoedaRepository {
     async save(moeda,cb) {
             return await moeda.save(function(mayHaveError) {
                cb(mayHaveError);
            });
     }

    async allMoedas() {
            let moedas = await Moeda.find();
            return moedas;
     }

     async update(id, moeda) {
        const updateMoeda = await Moeda.findByIdAndUpdate(id,{
            $set : moeda
        },{new:true});
        return updateMoeda;
   
    }

    async delete(id) {
        let deleteMoeda =  await Moeda.findByIdAndDelete(id);
        return deleteMoeda;
    }

}

module.exports = MoedaRepository;