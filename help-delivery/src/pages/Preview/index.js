import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import { FaCircle , FaRegCircle } from 'react-icons/fa';
import logoImg from '../../assets/logo.png'
import step1Img from '../../assets/step1.png'
import step2Img from '../../assets/step2.png'

export default class Preview extends React.Component{
     render(){
        return(
            <div>


                <div className="container-sides mt-10">

                    <div className="container-left ac mt-9">
                        <img className="display-b ac" src={logoImg} alt="delivery"/>
                    </div>

                    <div className="container-rigth ac">
                        <div className="card">
                            <img className="display-b ac img-size-1" src={step1Img} alt="delivery"/>

                            <img className="display-b ac img-size-1 hide" src={step2Img} alt="delivery"/>
                            
                            <div className="container-text ac">
                                <h1 className="title txt-alg-c mt-3">Faça seu pedido</h1>
                               

                                <Link className="link-1 hide" to="/Login">
                                    <button className="btn-1 ac">login</button>
                                </Link>
                                <p className="content-1 mt-4 txt-alg-c">Faça seu pedido de maneira simples e rápida, os pedidos de todos são mostrados na tela inicial</p>
                            </div>

                            <div className="display-pass ac mt-4">
                                <button className="btn-link-1 ml-a">skip</button>
                                {/* <span className="ball-step"></span> */}
                                <FaCircle className="ball-step"/>
                                <FaRegCircle className="ball-step"/>
                                {/* <span className="ball-step"></span> */}
                                <button className="btn-link-1 mr-a">next</button>
                            </div>

                        </div>
                    </div>

                </div>



            </div>
        )
     }
}