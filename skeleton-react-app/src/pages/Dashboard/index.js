import React from 'react'
// import Modal from '../../components/requestModal'
import Toolbar from '../../components/ToolBar'
import SideBar from '../../components/SideBar'
import DescriptionModal from '../../components/DescriptionModal';

import './style.scss'
import { IoIosPin, IoMdCart } from 'react-icons/io';
import { Card } from 'antd';


export default class Dashboard extends React.Component{
state = {
    sideBarOpen: false,
    descriptionModal:false,

    itens: [
        {case: 1, address:"Trindade, Florianópolis", placeName:"mercado 1", description:"descrição sobre o que a pessoa quer", fee:1},
        {case: 2, address:"Itacurubi, Florianópolis", placeName:"mercado 2", description:"descrição sobre o que a pessoa quer", fee:3},
        {case: 3, address:"Agronomica, Florianópolis", placeName:"mercado 3", description:"descrição sobre o que a pessoa quer", fee:6},
        {case: 4, address:"Trindade, Florianópolis", placeName:"mercado 4", description:"descrição sobre o que a pessoa quer", fee:100},
    ]
}

ToggleSideBar = () => {
    console.log("foi")
    this.setState( (prevState) => {
        return {sideBarOpen: !prevState.sideBarOpen};
    })
};

closeSidebar = () => {
    this.setState({sideBarOpen: false})
}

openDescriptionModal = () =>{
    // this.props
    this.setState({
        descriptionModal:true
    })
    console.log("Função que manda novo estado para componente")
}

render(){
    // let sideBar;

    // if(this.state.sideBarOpen){
    //     sideBar = <SideBar />;
    // }
    let propsData = this.state.descriptionModal;
    function openDescriptionModal() {
        let newProps = true
        propsData = newProps
        console.log( propsData )
    }

    return (
        <div>

            <Toolbar sideBarClickHandler={this.ToggleSideBar}/>

            
            {/* descriptionModalHandler={() => this.openDescriptionModal()} */}
            {/* {this.state.descriptionModal && <DescriptionModal/> } */}

            <DescriptionModal propsTeste={propsData}/>

            {this.state.sideBarOpen && <SideBar sideBarClickHandler={() => this.closeSidebar()} />}


            <div className="container-dashboard ac" >

                {this.state.itens.map((item, key) => 
     
                    <Card onClick={openDescriptionModal} className="card-dashboard ac mt-3">

                        <div>
                        <p>Caso {this.state.itens[key].case}</p>
                        
                        </div>

                    <p><IoIosPin/>{this.state.itens[key].address}</p>
                    <p><IoMdCart/>{this.state.itens[key].placeName}</p>

                    <p>Descrição:</p>
                    <p> {this.state.itens[key].description} </p>

                    <p>taxa de ajuda R$ {this.state.itens[key].fee}</p>
                    </Card>

                )}
                
            </div>
            

        </div>
        
        )

        
    }
    
}