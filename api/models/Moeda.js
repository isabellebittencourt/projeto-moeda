const mongoose =  require("mongoose")

const moedaSchema = new mongoose.Schema({
    moedaOrigem:{
        type:String,
        required: true,
        unique:false
    },
    moedaConvercao:{
        type:String,
        required: true,
        unique:false
    },
    valorMoeda:{
        type:String,
        required: true,
        unique:false
    },
    valorMoedaConvertida:{
        type:String,
        required: true,
        unique:false
    },
    valorMoedaInteiro:{
        type:Number,
        required: true,
        unique:false
    },
},{timestamps:true})

module.exports = mongoose.model("Moeda",moedaSchema);