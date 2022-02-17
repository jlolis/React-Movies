import React, { useEffect, useState} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

import './filme-info.css'

export default function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {

        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`);

            if( response.data.length === 0){
                navigate('/');
                alert('Page not Found');
                return;
            }
            
            setFilme(response.data);
            setLoading(false);
        }

        loadFilme();

        return () => {
            console.log('umounted component');
        }

    }, [navigate,id]);

    function salvaFilme(){
        const minhaLista = localStorage.getItem('filmes');
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id);

        if(hasFilme){
            alert('Esse filme já é favorito!');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        alert('Sucesso!');
    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando informações do filme!</h1>
            </div> 
        );
    }
    return(
        <div className="filme-info">
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome} />

            <h3>Sinopse</h3>
            <p>{filme.sinopse}</p>

            <div className="botoes">
                <button onClick={ salvaFilme }>Salvar</button>
                <button>
                <a target="blank" href={`https://www.youtube.com/results?search_query=${filme.nome} Trailer`}>Trailer</a>
                </button>
            </div>

        </div>
    );
}