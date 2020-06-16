import React from 'react';
import { Button  } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import CreateRequest from './CreateRequestModal'

export default class footerMenu extends React.Component{

    state = {
        visible: false
    }

    openModalToCreate = () => {
        this.setState({
            visible:true
        })
        console.log("essa função deve abrir o modal para criar um pedido")
    }
    hideModal(){
        this.setState({
            visible:false
        })
    }

    render(){
        return (

            <div>
                <p>{this.state.visible + 'haa'}</p>
                { this.state.visible && <CreateRequest  hideModal={() => this.hideModal()} visible={this.state.visible}/>}
                <h1>FOOTER</h1>
                <Button><Link to="/Dashboard"> Home </Link></Button>
                <Button shape="round" onClick={this.openModalToCreate} icon={<PlusOutlined />}/> 
                <Button><Link to="/Settings"> Settings </Link></Button>
            </div>
        
        )
    }
}