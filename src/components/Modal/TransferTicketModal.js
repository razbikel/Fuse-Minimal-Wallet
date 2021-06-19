import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import './Modal.css'
import '../Balances/Balances.css'


class TransferTicketModal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        if (nextProps.show !== this.props.show){
            return true;
        }
        else
            return false;
    }


    render(){
        return (
                <div
                className="Modal"
                style= {{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1': '0'
                }}>
                    {this.props.children}
                    <br />
                    <Button className="nav-button" onClick={this.props.close}>Close</Button>
                </div>
        )
    }
}

export default TransferTicketModal;