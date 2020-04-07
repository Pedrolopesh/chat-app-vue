import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import capaImg from '../../assets/capa.png'


export default class Dashboard extends React.Component{
     render(){
        return(
                <div className="container-sides mt-10">

                <div className="container-left ac mt-9">
                    <img className="display-b ac" src={capaImg} alt="delivery"/>
                </div>

                <div className="container-rigth ac">
                    <div className="card card-login">


                            <h1 className="title txt-alg-c mt-3">Entrar</h1>

                            <form className="mt-5">
                                <input className="input-1 mt-2 ac" placeholder="email"/>
                                <input className="input-1 mt-4 ac" placeholder="senha"/>
                            </form>

                            
                            <div className="container-link-login ac mt-5">
                            <Link className="link-1" to="/Dashboard">
                                <button className="btn-1 ac">Entrar</button>
                            </Link>
                            </div>

                            <div className="display-f ac mt-5">
                                <p className="content-login">não possui conta?</p><Link className="content-login ml-1 link-2" to="/Signup">clique aqui para cadastrar</Link>
                            </div>
                        </div>
                    </div>

                </div>
        )
     }
}