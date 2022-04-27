const mongoose =  require("mongoose")

const moedaSchema = new mongoose.Schema({
    moedaOrigem:{
        type:String,
        required: true,
        unique:true
    },
    moedaConvercao:{
        type:String,
        required: true,
        unique:true
    },
    valorMoeda:{
        type:String,
        required: true,
        unique:true
    },
    valorMoedaConvertida:{
        type:String,
        required: true,
        unique:true
    },
    valorMoedaInteiro:{
        type:Number,
        required: true,
        unique:true
    },
},{timestamps:true})

module.exports = mongoose.model("Moeda",moedaSchema);