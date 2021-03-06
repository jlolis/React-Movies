import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import api from "../../services/api";

import './home.css'

export default function Home(){
    const[filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        
        async function loadFilmes(){
            const response = await api.get('r-api/?api=filmes/ ');
            //console.log(response.data);
            setFilmes(response.data);
            setLoading(false);
        }

        loadFilmes();

    }, []);

    if(loading){
        return(
            <div className="filme-info">
                <h3>Carregando!</h3>
            </div> 
        );
    }

    return(
        <div className="container">
            <div className="listaFilmes">
                {filmes.map( (filme) => {
                    return(
                        <article key={filme.id}>
                            <strong>{filme.nome}</strong>
                            <img src={filme.foto} alt={filme.nome}  />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    );
                } )}
            </div>
        </div>
    );
}