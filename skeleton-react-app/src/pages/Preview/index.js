import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import { FaCircle , FaRegCircle } from 'react-icons/fa';
import logoImg from '../../assets/logo.png'
import step1Img from '../../assets/step1.png'
import step2Img from '../../assets/step2.png'

export default class Preview extends React.Component{



    constructor(props) {
        super(props);
        this.state = { step: 0 };

      }

    handleChangeStep() {
        // this.state = { step: 0 };
        this.setState({ step:1 })
    }
    
    returnStep(){
        this.setState({ step: 0 })
    }


     render(){
        
        return(
            <div>


                <div className="container-sides mt-10">

                    <div className="container-left ac mt-9">
                        <img className="display-b ac" src={logoImg} alt="delivery"/>
                    </div>

                    <div className="container-rigth ac">
                        <div className="card">
                            

                            {this.state.step === 0 && <div> 
                                
                                <img className="display-b ac img-size-1" src={step1Img} alt="delivery"/>    

                                <div className="container-text ac">
                                    <h1 className="title txt-alg-c mt-3">Faça seu pedido</h1>
                                    <p className="content-1 mt-4 txt-alg-c">Faça seu pedido de maneira simples e rápida, os pedidos de todos são mostrados na tela inicial</p>
                                </div>
                                
                             </div> }

                            {this.state.step === 1 && <div> 
                                
                                <img className="display-b ac img-size-1" src={step2Img} alt="delivery2"/>

                                <div className="container-text ac">
                                    <h1 className="title txt-alg-c mt-3">este step 1</h1>
                                    <p className="content-1 mt-4 txt-alg-c">Faça seu pedido de maneira simples e rápida, os pedidos de todos são mostrados na tela inicial</p>
                                   

                                   
                                    <Link className="link-1" to="/Login">
                                        <button className="btn-1 ac">login</button>
                                    </Link>
                                </div>
                                
                             </div> }
                            {/* <div>aqui: {this.state.step1}
                                <img className="display-b ac img-size-1" src={step1Img} alt="delivery"/>
                            </div> */}

                            <div className="display-pass ac mt-4">
                                <button className="btn-link-1 ml-a" onClick={() => this.returnStep()}>skip</button>
                                {/* <span className="ball-step"></span> */}

                                {this.state.step === 0 && <div className="display-pass">
                                    <FaCircle className="ball-step"/>
                                    <FaRegCircle className="ball-step"/>
                                </div>}

                                {this.state.step === 1 && <div className="display-pass">
                                    <FaRegCircle className="ball-step"/>
                                    <FaCircle className="ball-step"/>
                                </div>}
                                {/* <span className="ball-step"></span> */}
                                <button className="btn-link-1 mr-a" onClick={() => this.handleChangeStep()}>next</button>
                            </div>

                        </div>
                    </div>

                </div>



            </div>
        )
     }
}