import React from 'react'
import { IoIosClose } from 'react-icons/io';
// import './style.scss'
// import { Link } from 'react-router-dom'


export default function Modal(props) {

    function hidemodal() {
    }


    return (
      <div className="bg-modal" id="modal" >
          <div className="ac modal-request">
              <IoIosClose className="ml-a display-b icon-size-3" onClick={hidemodal}/>

              modal
          </div>
      </div>
    );
  }
  
