import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom'

export default class footerMenu extends React.Component{
    render(){
        return (

            <div>
                <h1>FOOTER</h1>
                <Button>Home</Button>
                <Button>Create</Button>
                <Button><Link to="/Settings"> Settings </Link></Button>
            </div>
        
        )
    }
}