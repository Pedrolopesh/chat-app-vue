import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/logo.png'

export default class Preview extends React.Component{
     render(){
        return(
            <div>


                <div className="container-sides">

                    <div className="container-left ac">
                        <img className="display-b ac" src={logoImg} alt="delivery"/>
                    </div>

                    <div className="container-rigth ac">
                        <div className="card">
                            <h1 className="title">Preview vai aqui</h1>

                        </div>
                    </div>

                </div>


                <Link to="/Login">
                    <button className="btn">login</button>
                </Link>


            </div>
        )
     }
}