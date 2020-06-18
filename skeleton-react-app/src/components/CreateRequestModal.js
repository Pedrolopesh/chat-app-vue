import React from 'react'
import { Modal, Button, Input, InputNumber } from 'antd';

const { TextArea } = Input;

export default class CreateRequestModal extends React.Component {
    state = { visible: this.props.visible};

    // showModal = () => {
    //     this.setState({
    //       visible: true,
    //     });
    //   };
    
      handleOk = e => {
        console.log(e);
        this.props.hideModal();
        // this.setState({
        //   visible: false,
        // });
      };
    
      handleCancel = e => {
        console.log(e);
        this.props.hideModal();
        // this.setState({
        //   visible: false,
        // });
      };
    

      render() {
        return (
          <div>
            <Modal
              title="Basic Modal"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >

            <div className="p10">
              <Input className="mt-1" placeholder="Titulo do caso"/>

              <Input className="mt-3" placeholder="Nome do Lugar"/>

            <div className="mt-3">
              <span>Taxa do pedido:</span>
              <InputNumber
                className=""
                defaultValue={10}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
            </div>

              <TextArea className="mt-3" rows={4} placeholder="Descrição: "/>

              <Button className="mt-3 ac display-b" type="primary">
                Create event
              </Button>
            </div>  

            </Modal>
          </div>
        );
      }
}