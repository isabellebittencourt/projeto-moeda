import {useEffect, useState, useRef } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import './formMoeda.css';
import axios from "axios"

export default function Form(props) {
  
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
  
    var numeroDigitado = document.querySelector(".first-input").value;
    var saida = document.querySelector("#saida");
    var selectFirst = document.querySelector(".first-select").value;
    var selectSecond = document.querySelector(".second-select").value;
    numeroDigitado = parseFloat(numeroDigitado);

    var myHeaders = new Headers();
    myHeaders.append("apikey", "hTAzPmMdyXhpbCyo4RLveX64KpTWak3D");

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${selectSecond}&from=${selectFirst}&amount=${numeroDigitado}`, requestOptions)
          .then(response => response.json())
          .then( (response) =>{
              console.log(response.result)
              calcular(response)
          })
          .catch(error => console.log('error', error));

  //valorMoedaSecundaria, codigoMoeda, codigoMoedaAtual,valorMoedaPrimaria
    function  calcular(result) {
     var numeroDigitado = result['query'].amount;
     var calculo = result.result;
      var valorDigitado = numeroDigitado.toLocaleString('de-DE',{style: 'currency', currency: selectFirst});
      var resultado = calculo.toLocaleString('de-DE',{style: 'currency', currency: selectSecond});
      saida.innerHTML = `Resultado: <b> ${valorDigitado} </b> é equivalente a <b>${resultado} </b>`

      let dados =  { 
      "moedaOrigem": selectFirst,
      "moedaConvercao": selectSecond,
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
