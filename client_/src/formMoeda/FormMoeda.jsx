import {useEffect, useState, useRef } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import './formMoeda.css';
import axios from "axios"

export default function Form(props) {
//https://github.com/RubenFilipe07/Conversor-de-moedas
//https://manage.exchangeratesapi.io/quickstart
  var resultado;
  let atualizar = "";
  let path = props.location.pathname
  const [valor,setValor] = useState("")
  const [firstSelect,setFirstSelect] = useState("")
  const [secondSelect,setSecondSelect] = useState("")
  const [id,setId] = useState("")
  useEffect(()=>{
    const updateValue = async () => {
          if(path == '/update'){
                  try{
                      atualizar = props.history.location.state['dados'];
                      setValor(atualizar.valorMoedaInteiro)
                      setId(atualizar._id)
                      setFirstSelect(atualizar.moedaOrigem)
                      setSecondSelect(atualizar.moedaConvercao)
                      console.log(atualizar.valorMoedaInteiro)
                    }catch(err){
                      console.log("erro")
                    }
          }
    }
    updateValue();
    },[ ]);
  

  fetch("http://api.exchangeratesapi.io/v1/latest?access_key=78c059c39b2748559e40186f5a65d53f")
  .then(result=> result.json())
  .then(
    (result) => {
      resultado = result['rates']
    });

  const salvar = async(data)=>{
          console.log(data);
            try{
              await axios.post("http://localhost:5000/api/moedas/register",data)
            }catch(err){
                console.log(err)
            }
  }

  const update = async(data)=>{
    console.log(id);
      try{
        await axios.put(`http://localhost:5000/api/moedas/`+id,data)
      }catch(err){
          console.log(err)
      }
}

function alertSweet(title){
  Swal.fire(
    title, '',
    'success',
  )
}

  function converter() {
    if(resultado != null) { 
    var real = resultado['BRL'] ;
    var euro = resultado["EUR"]
    var dolar = resultado["USD"]
    var dolarCanadense = resultado["CAD"]
    var dolarAustraliano = resultado["AUD"]
    var libra = resultado["GBP"]
    var peso = resultado["ARS"]
    var iene = resultado["JPY"]
    var yuan = resultado["CNY"]
    var franco = resultado["CHF"]
    var shekel = resultado["ILS"]
    var btcoin = resultado["BTC"]
  
    var numeroDigitado = document.querySelector(".first-input").value;
    numeroDigitado = parseFloat(numeroDigitado);

    var calculo;

    var saida = document.querySelector("#saida");
    var selectFirst = document.querySelector(".first-select").value;
    var selectSecond = document.querySelector(".second-select").value;
  
    function  calcular(valorMoedaSecundaria, codigoMoeda, codigoMoedaAtual,valorMoedaPrimaria) {
/*
      if(codigoMoeda == 'BTC' || codigoMoedaAtual == 'BTC'){
        peso  = valorMoedaSecundaria / valorMoedaPrimaria;  
      }else{
        peso  = valorMoedaSecundaria / valorMoedaPrimaria;  
        //peso  = valorMoedaPrimaria / valorMoedaSecundaria;   
      } */
      if(valorMoedaSecundaria > valorMoedaPrimaria ){
          peso  = valorMoedaSecundaria / valorMoedaPrimaria;
      }else{
        peso  = valorMoedaSecundaria / valorMoedaPrimaria;  
      }
      calculo = peso * numeroDigitado;

      console.log(valorMoedaPrimaria)
      console.log(valorMoedaSecundaria)
      var valorDigitado = numeroDigitado.toLocaleString('de-DE',{style: 'currency', currency: codigoMoedaAtual});
      var resultado = calculo.toLocaleString('de-DE',{style: 'currency', currency: codigoMoeda});
      saida.innerHTML = `Resultado: <b> ${valorDigitado} </b> é equivalente a <b>${resultado} </b>`

      let dados =  { 
      "moedaOrigem": codigoMoedaAtual,
      "moedaConvercao": codigoMoeda,
      "valorMoeda": valorDigitado,
      "valorMoedaInteiro" : numeroDigitado,
      "valorMoedaConvertida": resultado }

      if(path == '/register'){
        salvar(dados)
        alertSweet("Salvo com Sucesso");
      }else{
        update(dados)
        alertSweet("Atualizado com Sucesso");
      }
            
    }
  
    if (isNaN(numeroDigitado) == true && selectSecond == "NULL") {
      alert("Digite um valor e escolha uma moeda!")
      return false;
    } else {
      if (isNaN(numeroDigitado) == true) {
        alert("Digite um valor!")
        return false;
      }
      if (selectSecond == "NULL") {
        alert("Escolha uma moeda!")
        return false;
      }
      if(selectSecond === selectFirst){
        alert("você não pode converter uma moeda para a mesma moeda!")
        return false;
      }
    }
  
    if (numeroDigitado <= 0) {
      alert("Valor inválido! Digite somente valores positivos e diferentes de zero")
      return false;
    }

    if (selectSecond == "BRL" && !isNaN(numeroDigitado) && !isNaN(real)) {
        calcular(real, "BRL", selectFirst, resultado[selectFirst])
    }
  
    if (selectSecond == "EUR" && !isNaN(numeroDigitado) && !isNaN(euro)) {
        calcular(euro, "EUR", selectFirst, resultado[selectFirst])
    }
  
    if (selectSecond == "USD" && !isNaN(numeroDigitado) && !isNaN(dolar)) {
        calcular(dolar, "USD", selectFirst, resultado[selectFirst])
    }
  
    if (selectSecond == "CAD" && !isNaN(numeroDigitado) && !isNaN(dolarCanadense)) {
        calcular(dolarCanadense, "CAD", selectFirst, resultado[selectFirst])        
    }
  
    if (selectSecond == "AUD" && !isNaN(numeroDigitado) && !isNaN(dolarAustraliano)) {
        calcular(dolarAustraliano, "AUD", selectFirst, resultado[selectFirst])
    }
  
    if (selectSecond == "GBP" && !isNaN(numeroDigitado) && !isNaN(libra)) {
        calcular(libra, "GBP", selectFirst, resultado[selectFirst])
    }
  
    if (selectSecond == "ARS" && !isNaN(numeroDigitado) && !isNaN(peso)) {
        calcular(peso, "ARS", selectFirst, resultado[selectFirst])
    }
  
    if (selectSecond == "JPY" && !isNaN(numeroDigitado) && !isNaN(iene)) {
        calcular(iene, "JPY", selectFirst, resultado[selectFirst])
    }
  
    if (selectSecond == "CNY" && !isNaN(numeroDigitado) && !isNaN(yuan)) {
        calcular(yuan, "CNY", selectFirst, resultado[selectFirst])
    }
  
    if (selectSecond == "CHF" && !isNaN(numeroDigitado) && !isNaN(franco)) {
        calcular(franco, "CHF", selectFirst, resultado[selectFirst])
    }
  
    if (selectSecond == "ILS" && !isNaN(numeroDigitado) && !isNaN(shekel)) {
        calcular(shekel, "ILS", selectFirst, resultado[selectFirst])
    }
  
    if (selectSecond == "BTC" && !isNaN(numeroDigitado) && !isNaN(btcoin)) {
        btcoin = btcoin * 1000
        calcular(btcoin, "BTC", selectFirst, resultado[selectFirst])
    }

  }
  
  }

  return (
    <div className='container'>
            <div className='form'>
                    <h2> Converter Moeda</h2>
                    <div className='input-group'>
                            <input className="first-input"  value={valor} placeholder='Digite o valor'  onChange={e =>setValor(e.target.value)}></input>
                    </div>
                    <div className='select-group'>
                      <select  value={firstSelect} className='select first-select' onChange={e =>setFirstSelect(e.target.value)}>
                                              <option value='NULL'>Selecione</option>
                                              <option value='BRL'>Real</option>
                                              <option value='EUR'>Euro</option>
                                              <option value='USD'>Dólar</option>
                                              <option value='CAD'>Dólar canadense</option>
                                              <option value='AUD'>Dólar australiano</option>
                                              <option value='GBP'>Libra Esterlina</option>
                                              <option value='ARS'>Peso argentino</option>
                                              <option value='JPY'>Iene Japonês</option>
                                              <option value='CNY'>Yuan Chinês</option>
                                              <option value='CHF'>Franco Suíço</option>
                                              <option value='ILS'>Novo Shekel Israelense</option>
                                              <option value='BTC'>Bitcoin</option>
                                      </select>
                                    <select  value={secondSelect} className='select second-select' onChange={e =>setSecondSelect(e.target.value)}>
                                    <option value='NULL'>Selecione</option>
                                             <option value='BRL'>Real</option>
                                              <option value='EUR'>Euro</option>
                                              <option value='USD'>Dólar</option>
                                              <option value='CAD'>Dólar canadense</option>
                                              <option value='AUD'>Dólar australiano</option>
                                              <option value='GBP'>Libra Esterlina</option>
                                              <option value='ARS'>Peso argentino</option>
                                              <option value='JPY'>Iene Japonês</option>
                                              <option value='CNY'>Yuan Chinês</option>
                                              <option value='CHF'>Franco Suíço</option>
                                              <option value='ILS'>Novo Shekel Israelense</option>
                                              <option value='BTC'>Bitcoin</option>
                                    </select>
                    </div>
                    <div className='button-group'>
                             <button className='button-converter' onClick={converter}>Converter</button>
                    </div>  
                    
                    <div id="saida"></div> 
            </div>
    </div>
  )

}
