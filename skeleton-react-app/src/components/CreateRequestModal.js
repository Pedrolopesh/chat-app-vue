import React from 'react'
import { Modal, Button } from 'antd';

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
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>

            <Button type="primary">
              Create event
            </Button>

            </Modal>
          </div>
        );
      }
}