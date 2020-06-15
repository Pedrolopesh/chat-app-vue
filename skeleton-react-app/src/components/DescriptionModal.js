import React from 'react'
import { Modal } from 'antd';

export default class DescriptionModal extends React.Component {

    state ={
        visible: this.props.propsTeste
    };

    // constructor(props) {
    //     super(props);
    //     // Não faça isso!
    //     // this.hideModal()
    // }

    hideModal = () =>{
        console.log("asaasasa")
        console.log(this.props.propsTeste)
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
    };
    
    handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
    };
    
    handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
    };

render(){
    console.log(this.props)
    return (
        <div className="header">
            <div>
                <button onClick={this.hideModal}></button>
                <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                </Modal>
            </div>
        </div>
    )
  }
  }
  
