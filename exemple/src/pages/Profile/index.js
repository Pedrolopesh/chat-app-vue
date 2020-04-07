import React, { useState , useEffect } from 'react';
import logoImg from '../../assets/logo.svg'

import './style.css';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api'

export default  function Register(){
    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')
    const [ incidents, setIncidents] = useState([]);
    const history = useHistory()

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    } , [ ongId ])

    async function handleDeleteIncident( id ){
        try{
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization: ongId,
                }
            });

        setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err){
            alert('Erro ao deletetar caso, tente novamente')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg}/>
                <span>Bem vindo, {ongName}</span>

                <Link className="button" to="/incident/new">Cadastrar novo caso</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map( incidident => (
                        <li key={incidident.id}>
                        <strong>CASO:</strong>
                        <p>{incidident.title}</p>
                        
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incidident.description}</p>
                        
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(incidident.value)}</p>
    
                        <button onClick={() => handleDeleteIncident(incidident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                        </button>
                    </li> 
                ))}
            </ul>
        </div>
    );
}