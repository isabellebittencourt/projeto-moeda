import {useEffect, useState} from "react";
import './home.css';
import axios from "axios"
import Posts from "../posts/Posts";

export default function Home() {
    
    const [moedas, setMoedas] = useState([]);
    useEffect(()=>{
      const fetchMoedas = async () => {
        const res = await axios.get("http://localhost:5000/api/moedas")
        setMoedas(res.data)
      }
      fetchMoedas();
      },[ ]);
    
  return (
    <div className="home">
           <Posts posts={moedas}/>
            
    </div>
  )
}
