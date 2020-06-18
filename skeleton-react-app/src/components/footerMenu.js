import React from 'react';
// import { Button  } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import CreateRequest from './CreateRequestModal'


export default class footerMenu extends React.Component{

    state = {
        visible: true
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

            <>
                {/* <p>{this.state.visible + 'haa'}</p> */}
                { this.state.visible && <CreateRequest  hideModal={() => this.hideModal()} visible={this.state.visible}/>}
                {/* <h1>FOOTER</h1> */}
                <footer className="footerBar ac mt-15">

                    <button className="footerButton ac">
                        <Link to="/Dashboard"><HomeOutlined className="size-footer-icons"/></Link>
                    </button>

                    <button onClick={this.openModalToCreate} className="footerButton size-footer-icons ac">
                        <PlusOutlined/>
                    </button>

                    <button className="footerButton size-footer-icons ac">
                        <Link to="/Settings"><SettingOutlined/></Link>
                    </button>

                </footer>
            </>
        
        )
    }
}