import React from 'react';
import { Button  } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import CreateRequest from './CreateRequest'

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

    render(){
        return (

            <div>
                { this.state.visible && <CreateRequest/>}
                <h1>FOOTER</h1>
                <Button><Link to="/Dashboard"> Home </Link></Button>
                <Button shape="round" onClick={this.openModalToCreate} icon={<PlusOutlined />}/> 
                <Button><Link to="/Settings"> Settings </Link></Button>
            </div>
        
        )
    }
}