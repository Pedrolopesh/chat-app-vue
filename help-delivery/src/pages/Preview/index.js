import React from 'react'
import { Link } from 'react-router-dom'

export default class Preview extends React.Component{
     render(){
        return(
            <div>
                <h1>Preview vai aqui</h1>
                <Link to="/Login">
                    <button>login</button>
                </Link>
{/* 
                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02041"/>
                    Não tenho cadastro
                </Link> */}
            </div>
        )
     }
}