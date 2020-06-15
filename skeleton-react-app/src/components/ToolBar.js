import React from 'react'
// import { IoIosOptions, IoIosArrowForward} from 'react-icons/io';
import { Modal, Button } from 'antd';
// import { Link } from 'react-router-dom'


export default class Toolbar extends React.Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    
    showSideBar = () => {
        // var lang = "teste";
        this.props.sideBarClickHandler();
    }

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
    return (
      <div className="header">
      <div className="mr-a">
          {/* <IoIosOptions onClick={props.sideBarClickHandler} className="icon-size-3 cp"/> */}
          <Button onClick={this.showSideBar} type="primary">SIDE BAR</Button>
      </div>

      <div className="ac">
          <p>Clique para mais informações do pedido</p>
      </div>

      <div className="ml-a">
          <Button className="create-request" onClick={this.showModal}>
              Criar Pedido
              {/* <IoIosArrowForward/> */}
          </Button>
      </div>


      {/* <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button> */}
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
    )
  }
  }
  
