import Swal from 'sweetalert2/dist/sweetalert2.js'
import {useEffect, useState} from "react";
import axios from "axios"
import './post.css'
import { Link } from "react-router-dom";
export default function Post({post}) {

  const deletar = async()=>{
        try{
                await axios.delete(`http://localhost:5000/api/moedas/`+post._id)
                alertSweet('Deletado com sucesso')
        }catch(err){
                  console.log(err)
        }
  }

  function alertSweet(title){
        Swal.fire(
          title, '',
          'success',
        ).then((result) => {
                if (result.isConfirmed) {
                        reloadPage();
                } 
              })
      }
   function reloadPage(){
        document.location.reload(true);
   }
  return (
        <div className='list'>
                <div className="info">
                        <p className='texto1'>
                                Valor inserido: <b>{post.valorMoeda}</b>
                          </p>
                        <p className='texto2'>
                                 O Valor  {post.valorMoeda} ( {post.moedaOrigem} ) equivale a {post.valorMoedaConvertida} (  {post.moedaConvercao} )
                          </p>
                </div>
                <div className="buttonsList">
                          <button className='excluir' onClick={deletar}>Excluir</button>
                          <Link to={{pathname: '/update', state:{dados:post}}} className="Link" >
                                        <button className='editar'>Editar</button>
                          </Link>
                </div>
        </div>
  )
}
